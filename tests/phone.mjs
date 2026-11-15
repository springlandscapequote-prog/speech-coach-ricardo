// Phone checks for Ricardo's Speech Coach. From the repo root, with Playwright installed:
// python3 -m http.server 8765 --bind 127.0.0.1
// NODE_PATH=/tmp/pw/node_modules BASE=http://127.0.0.1:8765/ node tests/phone.mjs
import { chromium, webkit } from "playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.BASE || "http://127.0.0.1:8765/";
const OUT = process.env.OUT || "/opt/cursor/artifacts";
fs.mkdirSync(OUT, { recursive: true });

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function overflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const nodes = [];
    document.querySelectorAll("body *").forEach((el) => {
      if (!(el instanceof Element)) return;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      if (rect.right > doc.clientWidth + 1 || rect.left < -1) {
        const id = el.id ? "#" + el.id : "";
        const cls = el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
        nodes.push(el.tagName + id + cls + " right=" + Math.round(rect.right) + " left=" + Math.round(rect.left));
      }
    });
    const prompter = document.getElementById("prompter-scroll");
    let prompterOverflow = false;
    if (prompter && !document.getElementById("prompter").hidden) {
      prompterOverflow = prompter.scrollWidth > prompter.clientWidth + 2;
    }
    return {
      doc: doc.scrollWidth > doc.clientWidth + 1,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      nodes: nodes.slice(0, 8),
      prompterOverflow
    };
  });
}

async function shot(page, name) {
  const file = path.join(OUT, name + ".png");
  await page.screenshot({ path: file });
  return file;
}

async function runProfile(browserType, name, width, height) {
  const errors = [];
  const external = [];
  const browser = await browserType.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 1,
    locale: "en-US"
  });
  await context.addInitScript(() => {
    const key = "ricardo-speech.v1.settings";
    if (localStorage.getItem(key)) return;
    const d = new Date();
    const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    localStorage.setItem(key, JSON.stringify({ startDate: iso }));
  });
  const page = await context.newPage();
  page.on("pageerror", (err) => errors.push("PAGE " + err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push("CONSOLE " + msg.text());
  });
  page.on("request", (req) => {
    try {
      const url = new URL(req.url());
      if (url.hostname !== "127.0.0.1" && url.hostname !== "localhost") external.push(url.href);
    } catch (err) { /* ignore */ }
  });

  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.getByTestId("greeting").waitFor({ timeout: 8000 });
  const helloEs = (await page.getByTestId("greeting").innerText()).trim();
  assert(helloEs === "Hola, Ricardo.", name + " default greeting " + helloEs);
  assert((await page.getByTestId("lang-es").getAttribute("aria-pressed")) === "true", name + " default lang button");
  await page.getByText("Semana 1 de 4").first().waitFor();

  const tabsEs = [
    ["today", "tab-today", "Semana 1 de 4"],
    ["drill", "tab-drill", "Temporizador de 10 minutos"],
    ["lessons", "tab-lessons", "Desbloquea tu carisma"],
    ["script", "tab-script", "Guion de 60 segundos"],
    ["score", "tab-score", "Pedir el sí"]
  ];
  for (const [tab, id, text] of tabsEs) {
    await page.getByTestId(id).tap();
    await page.locator("#panel-" + tab).getByText(text).first().waitFor({ timeout: 5000 });
    if (tab === "script") await page.locator("#panel-script").getByText("Winter Bright").first().waitFor();
    const over = await overflow(page);
    assert(!over.doc && !over.nodes.length, name + " es overflow on " + tab + " " + JSON.stringify(over));
    await shot(page, "ricardo-" + name + "-es-" + tab);
  }

  await page.getByTestId("tab-lessons").tap();
  await page.locator("[data-lesson='1']").tap();
  await page.locator("#panel-lessons").getByRole("heading", { name: "Idea clave" }).waitFor();
  const purpose = (await page.getByTestId("script-purpose").innerText()).trim();
  assert(/inglés/i.test(purpose), name + " spanish purpose " + purpose);
  const scriptEs = await page.getByTestId("lesson-script").innerText();
  assert(/Ricardo/.test(scriptEs) && /Mrs\. Carter/.test(scriptEs), name + " spanish mode script " + scriptEs);
  assert(!/cotización|inglés|propiedad/i.test(scriptEs), name + " script translated " + scriptEs);

  await page.getByTestId("tab-drill").tap();
  await page.getByRole("button", { name: /3\. Trabalenguas/ }).tap();
  await page.getByText("Pon la punta de la lengua").waitFor();
  await page.getByText("Three thousand thin thorns through the hedge.").waitFor();
  await page.getByText("Zack's zebra zigzags in the zone.").waitFor();

  await page.getByTestId("tab-script").tap();
  await page.getByTestId("open-prompter").tap();
  await page.getByTestId("prompter").waitFor();
  await page.locator("#prompter-text").getByText("Ricardo").first().waitFor();
  const overEsP = await overflow(page);
  assert(!overEsP.doc && !overEsP.prompterOverflow && !overEsP.nodes.length, name + " es prompter overflow " + JSON.stringify(overEsP));
  await shot(page, "ricardo-" + name + "-es-prompter");
  await page.getByTestId("prompter-close").tap();

  await page.getByTestId("lang-en").tap();
  await page.getByTestId("tab-today").tap();
  await page.getByText("Hi, Ricardo.").waitFor();
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByTestId("greeting").waitFor();
  assert((await page.getByTestId("greeting").innerText()).trim() === "Hi, Ricardo.", name + " english did not persist");
  assert((await page.getByTestId("lang-en").getAttribute("aria-pressed")) === "true");
  await page.getByText("Clear sounds + strong first impression").first().waitFor();

  const tabs = [
    ["today", "tab-today", "Week 1 of 4"],
    ["drill", "tab-drill", "10-minute drill timer"],
    ["lessons", "tab-lessons", "Unlock Your Charisma"],
    ["script", "tab-script", "Winter Bright"],
    ["score", "tab-score", "Asking for the yes"]
  ];

  for (const [tab, id, text] of tabs) {
    await page.getByTestId(id).tap();
    await page.locator("#panel-" + tab).getByText(text).first().waitFor({ timeout: 5000 });
    const over = await overflow(page);
    assert(!over.doc && !over.nodes.length, name + " overflow on " + tab + " " + JSON.stringify(over));
    await shot(page, "ricardo-" + name + "-en-" + tab);
  }

  await page.getByTestId("tab-drill").tap();
  const t1 = (await page.getByTestId("timer").innerText()).trim();
  assert(t1 === "10:00", name + " timer start " + t1);
  await page.getByTestId("timer-toggle").tap();
  await page.waitForTimeout(1300);
  const t2 = (await page.getByTestId("timer").innerText()).trim();
  assert(t2 !== "10:00" && t2 !== t1, name + " timer did not count " + t1 + " -> " + t2);
  await page.getByTestId("timer-toggle").tap();
  const paused = (await page.getByTestId("timer").innerText()).trim();
  await page.waitForTimeout(700);
  const paused2 = (await page.getByTestId("timer").innerText()).trim();
  assert(paused === paused2, name + " pause failed " + paused + " -> " + paused2);
  await page.getByTestId("timer-reset").tap();
  assert((await page.getByTestId("timer").innerText()).trim() === "10:00", name + " reset failed");

  await page.getByRole("button", { name: /Time 30 sec/ }).first().tap();
  await page.waitForTimeout(1100);
  const part = await page.getByTestId("part-timer").innerText();
  assert(/Belly breathing/.test(part) && !/0:30$/.test(part), name + " part timer " + part);

  await page.getByRole("button", { name: /3\. Tongue Twisters/ }).tap();
  await page.getByText("Three thousand thin thorns through the hedge.").waitFor();
  await page.getByText("Zack's zebra zigzags in the zone.").waitFor();
  await page.getByText("I listed the work, confirmed the scope, and asked for the yes.").waitFor();

  await page.getByTestId("tab-lessons").tap();
  await page.locator("[data-lesson='1']").tap();
  await page.getByTestId("lesson-script").waitFor();
  const scriptHtml = await page.getByTestId("lesson-script").innerHTML();
  assert(scriptHtml.includes("pause"), name + " missing pause mark");
  assert(scriptHtml.includes("stress"), name + " missing stress mark");
  assert(scriptHtml.includes("Ricardo"), name + " missing script text");
  assert((await page.getByTestId("mark-complete").getAttribute("aria-pressed")) === "false");
  await page.getByTestId("mark-complete").tap();
  assert((await page.getByTestId("mark-complete").getAttribute("aria-pressed")) === "true");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByTestId("tab-lessons").tap();
  await page.locator("[data-lesson='1']").tap();
  assert((await page.getByTestId("mark-complete").getAttribute("aria-pressed")) === "true", name + " lesson did not persist");
  await page.getByRole("button", { name: "All lessons" }).tap();
  await page.locator("[data-lesson='11']").tap();
  await page.locator("#panel-lessons").getByText("Mrs. Carter").first().waitFor();
  await page.locator("[data-action='speak']").first().tap();
  await page.waitForTimeout(250);
  const spoken = await page.evaluate(() => {
    const block = document.querySelector("[data-testid='lesson-script']");
    const btn = block && block.parentElement ? block.parentElement.querySelector("[data-action='speak']") : null;
    return {
      speak: btn ? decodeURIComponent(btn.getAttribute("data-speak") || "") : "",
      heard: window.__lastUtterance || null,
      canSpeak: !!(window.speechSynthesis && window.SpeechSynthesisUtterance)
    };
  });
  assert(/Mrs\. Carter/.test(spoken.speak), name + " speak text " + spoken.speak);
  assert(!/[áéíóúñ¿¡]/.test(spoken.speak), name + " speak not english " + spoken.speak);
  if (spoken.canSpeak) {
    assert(spoken.heard && spoken.heard.lang === "en-US", name + " voice lang " + JSON.stringify(spoken.heard));
    assert(/Mrs\. Carter/.test(spoken.heard.text), name + " heard " + JSON.stringify(spoken.heard));
    if (spoken.heard.voiceLang) assert(/^en([_-]|$)/i.test(spoken.heard.voiceLang), spoken.heard.voiceLang);
  }

  await page.getByTestId("tab-score").tap();
  await page.getByTestId("skill-0-4").tap();
  await page.getByTestId("skill-1-5").tap();
  let total = (await page.getByTestId("week-total").innerText()).trim();
  assert(total === "Total 9 / 75", name + " total " + total);
  let counted = (await page.getByTestId("week-counted").innerText()).trim();
  assert(counted === "2 of 15 skills scored", name + " counted " + counted);
  await page.locator(".chip", { hasText: "Week 2" }).tap();
  await page.getByTestId("skill-3-2").tap();
  total = (await page.getByTestId("week-total").innerText()).trim();
  assert(total === "Total 2 / 75", name + " week2 total " + total);
  await page.locator(".chip", { hasText: "Week 1" }).tap();
  total = (await page.getByTestId("week-total").innerText()).trim();
  assert(total === "Total 9 / 75", name + " week1 restored " + total);
  const history = await page.getByTestId("score-history").innerText();
  assert(history.includes("Total 9 / 75") && history.includes("Total 2 / 75"), name + " history " + history);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByTestId("tab-score").tap();
  total = (await page.getByTestId("week-total").innerText()).trim();
  assert(total === "Total 9 / 75", name + " score did not persist " + total);
  assert((await page.getByTestId("skill-0-4").getAttribute("aria-pressed")) === "true");
  assert((await page.getByTestId("skill-1-5").getAttribute("aria-pressed")) === "true");
  const history2 = await page.getByTestId("score-history").innerText();
  assert(history2.includes("Total 9 / 75") && history2.includes("Total 2 / 75"), name + " history lost");

  await page.getByTestId("tab-script").tap();
  await page.getByTestId("open-prompter").tap();
  await page.getByTestId("prompter").waitFor();
  const pauses = await page.locator("#prompter-text .pause").count();
  const stresses = await page.locator("#prompter-text .stress").count();
  assert(pauses > 8, name + " prompter pauses " + pauses);
  assert(stresses > 8, name + " prompter stress " + stresses);
  await page.getByTestId("prompter-play").tap();
  await page.waitForTimeout(700);
  const scrolled = await page.getByTestId("prompter-scroll").evaluate((el) => el.scrollTop);
  assert(scrolled > 8, name + " prompter did not scroll " + scrolled);

  await page.getByTestId("prompter-play").tap();
  await page.getByTestId("prompter-scroll").evaluate((el) => { el.scrollTop = 0; });
  await page.getByTestId("prompter-speed").evaluate((el) => {
    el.value = "20";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  assert((await page.getByTestId("prompter-speed-value").innerText()).trim() === "20", name + " speed label");
  await page.getByTestId("prompter-play").tap();
  await page.waitForTimeout(500);
  const slow = await page.getByTestId("prompter-scroll").evaluate((el) => el.scrollTop);
  await page.getByTestId("prompter-play").tap();
  await page.getByTestId("prompter-scroll").evaluate((el) => { el.scrollTop = 0; });
  await page.getByTestId("prompter-speed").evaluate((el) => {
    el.value = "160";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  assert((await page.getByTestId("prompter-speed-value").innerText()).trim() === "160");
  await page.getByTestId("prompter-play").tap();
  await page.waitForTimeout(500);
  const fast = await page.getByTestId("prompter-scroll").evaluate((el) => el.scrollTop);
  assert(fast > slow * 2, name + " speed change slow=" + slow + " fast=" + fast);

  await page.getByTestId("prompter-scroll").tap();
  await page.waitForTimeout(120);
  const held = await page.getByTestId("prompter-scroll").evaluate((el) => el.scrollTop);
  await page.waitForTimeout(500);
  const held2 = await page.getByTestId("prompter-scroll").evaluate((el) => el.scrollTop);
  assert(Math.abs(held2 - held) < 2, name + " tap did not pause " + held + " -> " + held2);
  assert((await page.getByTestId("prompter-play").innerText()).trim() === "Play", name + " pause button label");

  await page.getByTestId("prompter-font").evaluate((el) => {
    el.value = "64";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  const fontSize = await page.locator("#prompter-text").evaluate((el) => getComputedStyle(el).fontSize);
  assert(fontSize === "64px", name + " font " + fontSize);
  const overP = await overflow(page);
  assert(!overP.doc && !overP.prompterOverflow && !overP.nodes.length, name + " prompter overflow " + JSON.stringify(overP));
  await shot(page, "ricardo-" + name + "-en-prompter");
  await page.getByTestId("prompter-close").tap();

  await page.getByTestId("tab-drill").tap();
  await page.getByRole("button", { name: /6\. Record/ }).tap();
  await page.getByRole("button", { name: "Record a 30-second clip" }).tap();
  await page.getByTestId("rec-start").tap();
  await page.waitForTimeout(600);
  const status = (await page.locator("#rec-status").innerText()).trim();
  const stopHidden = await page.getByTestId("rec-stop").isHidden();
  if (!stopHidden) {
    await page.getByTestId("rec-stop").tap();
    await page.waitForTimeout(400);
    const play = page.locator("[data-action='play-rec']").first();
    if (await play.count()) {
      await play.tap();
      await page.waitForTimeout(200);
      await page.locator("[data-action='discard-rec']").first().tap();
    }
  } else {
    assert(/microphone|out loud|uploaded|this phone|isn't available|could not/i.test(status), name + " mic message: " + status);
  }

  const mimeMp4 = await page.evaluate(() => window.pickRecorderMime((t) => t === "audio/mp4"));
  const mimeWebm = await page.evaluate(() => window.pickRecorderMime((t) => t === "audio/webm;codecs=opus"));
  const mimeNone = await page.evaluate(() => window.pickRecorderMime(() => false));
  assert(mimeMp4 === "audio/mp4", mimeMp4);
  assert(mimeWebm === "audio/webm;codecs=opus", mimeWebm);
  assert(mimeNone === "", mimeNone);

  await page.evaluate(() => {
    const d = new Date();
    d.setDate(d.getDate() - 28);
    const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const raw = JSON.parse(localStorage.getItem("ricardo-speech.v1.settings") || "{}");
    raw.startDate = iso;
    localStorage.setItem("ricardo-speech.v1.settings", JSON.stringify(raw));
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByTestId("plan-complete").waitFor();
  await page.getByTestId("restart-ask").tap();
  await page.getByTestId("restart-yes").tap();
  await page.getByTestId("start-lesson").waitFor();
  assert(await page.getByTestId("plan-complete").count() === 0, name + " restart left plan complete");

  const version = await page.getByTestId("version").innerText();
  assert(version.includes("1.0.0"), version);
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  assert(robots === "noindex,nofollow", robots);
  const json = await page.evaluate(async () => (await fetch("version.json")).json());
  assert(json.version === "1.0.0", JSON.stringify(json));

  await page.getByTestId("lang-es").tap();
  await page.getByTestId("tab-today").tap();
  await page.getByText("Hola, Ricardo.").waitFor();
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByText("Hola, Ricardo.").waitFor();
  assert((await page.getByTestId("lang-es").getAttribute("aria-pressed")) === "true", name + " spanish did not persist");
  await page.getByTestId("tab-lessons").tap();
  await page.locator("[data-lesson='11']").tap();
  const stillEnglish = await page.getByTestId("lesson-script").innerText();
  assert(/Mrs\. Carter/.test(stillEnglish) && /yes/i.test(stillEnglish), name + " script changed " + stillEnglish);
  assert(!/[áéíóúñ¿¡]/.test(stillEnglish), name + " script gained spanish " + stillEnglish);
  const purposeAgain = await page.getByTestId("script-purpose").innerText();
  assert(/inglés/i.test(purposeAgain), purposeAgain);

  const storage = await page.evaluate(async () => {
    const keys = Object.keys(localStorage);
    let dbNames = null;
    if (indexedDB.databases) {
      try {
        const all = await indexedDB.databases();
        dbNames = all.map((d) => d.name);
      } catch (err) {
        dbNames = null;
      }
    }
    return {
      keys,
      settings: localStorage.getItem("ricardo-speech.v1.settings"),
      dbNames
    };
  });
  assert(storage.keys.some((k) => k.indexOf("ricardo-speech.v1.") === 0), storage.keys.join(","));
  assert(!storage.keys.some((k) => k.indexOf("speechcoach.") === 0), storage.keys.join(","));
  assert(storage.settings.indexOf('"lang":"es"') !== -1, storage.settings);
  if (storage.dbNames) {
    assert(storage.dbNames.indexOf("ricardo-speech-coach") !== -1, storage.dbNames.join(","));
    assert(storage.dbNames.indexOf("speech-coach") === -1, storage.dbNames.join(","));
  }

  const allText = await page.evaluate(() => document.body.textContent || "");
  assert(!/\$\d/.test(allText), name + " dollar amount");
  assert(!/@[a-z0-9.-]+\.[a-z]{2,}/i.test(allText), name + " email");
  assert(!/\b\d{3}[-.)]\d{3}[-.\s]\d{4}\b/.test(allText), name + " phone");
  assert(!/Fernando/.test(allText), name + " old name");
  assert(!/two hours|twenty minutes|one hundred new homes/i.test(allText), name + " old promise");

  assert(!external.length, name + " external requests " + external.join(", "));
  assert(!errors.length, name + " console/page errors:\n" + errors.join("\n"));
  await browser.close();
  console.log("PASS", name, width + "x" + height);
}

const only = process.argv[2];
const profiles = [
  ["iphone13", webkit, 390, 664],
  ["pixel390", chromium, 390, 664],
  ["pixel375", chromium, 375, 553]
];

for (const [name, type, w, h] of profiles) {
  if (only && name !== only) continue;
  await runProfile(type, name, w, h);
}
console.log("ALL PASS");
