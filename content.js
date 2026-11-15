/* Ricardo's Speech Coach. Coaching copy is bilingual.
   Practice scripts, tongue twisters, and the teleprompter stay in English.
   Markup: **stress**, ~stage or italics~, {/} short pause, {//} longer pause. */
(function () {
  "use strict";

  var ROTATION = {
    1: [1, 2, 3, 1, 2, 3, "review"],
    2: [4, 5, 6, 4, 5, 6, "review"],
    3: [7, 8, 9, 7, 8, 9, "review"],
    4: [10, 11, "all", 10, 11, "all", "all"]
  };

  var OVERART = "Thank you for taking my call. This is Ricardo with Spring Landscape and Winter Bright. I help with lawns, beds, shrubs, and holiday lighting. I would be glad to visit, walk the property with you, and give you a clear price. What would you like the place to feel like when the work is done?";

  var VOICEMAIL = "Hi, Mrs. Carter. {/} This is **Ricardo** {/} with **Spring Landscape** {/} and **Winter Bright**. {//} I am following up {/} about the yard {/} and **holiday lighting**. {/} I would be glad to walk the property with you {/} and give you a **clear** price. {//} I will try you again. {/} **Thank** you.";

  var LESSON_SCRIPTS = [
    {
      script: "Hi, Mrs. Carter? {/} I'm **Ricardo**, {/} with **Spring Landscape**. {/} **Thank** you for having me out. {/} Before I look at anything, {/} tell me — {/} what is **bothering** you most about the yard right now? {/} And what would make it feel **right** to you?"
    },
    {
      script: "Hi, Mrs. Carter. {/} This is **Ricardo** {/} with **Spring Landscape**. {/} You asked about the lawn {/} and the beds. {/} I want to **understand** the property {/} and then walk it **with** you. {/} What matters **most** right now — {/} the lawn, {/} the beds, {/} or both?",
      script2: VOICEMAIL
    },
    {
      script: "For the maintenance package we just walked — {/} mowing, edging, blowing, {/} and keeping the beds **clean** — {/} your price is **[price]**. {/} ~[pause — count to 3 silently]~ {/} That covers the work we **outlined** {/} and a clear **scope**."
    },
    {
      script: "Mr. and Mrs. Nguyen, {/} **three** options. {/} **One** — {/} a lighter plan {/} for the lawn and the edges. {/} **Two** — {/} a fuller plan {/} that also keeps the beds **clean**. {/} **Three** — {/} maintenance **plus** holiday lighting {/} with **Winter Bright**. {/} Which one should we **price** for this property?"
    },
    {
      script: "Mrs. Bennett's front walk {/} was **lost** in the shrubs. {/} She had stopped inviting people over. {/} We cleared the view, {/} shaped the beds, {/} and the maintenance keeps it **that way**. {/} She told me the house feels like **hers** again. {/} That is what I want for **your** place too."
    },
    {
      script: "Let's walk it **together**. {/} ~[open hand toward the beds]~ {/} Over here, {/} the beds need a good **cleanup** and fresh edges. {/} ~[open hand toward the hedge]~ {/} This hedge needs **pruning** {/} before the growing season gets ahead of it. {/} ~[turn to face them, hands still]~ {/} Here is the package I **recommend**."
    },
    {
      script: "I can see you're **busy**, {/} so let me ask — {/} do you want the **short** version {/} or should we **walk** the whole property? {/} … {/} Got it. {/} What matters **most** to you: {/} the **price**, {/} how it **looks**, {/} or not having to **think** about it?"
    },
    {
      script: "Mrs. Carter, {/} quick follow-up. {/} I sent the estimate {/} after our walk. {/} I want you to have a **clear** number {/} while you decide. {/} A **yes** {/} or a **no** {/} both help me. {/} What questions are still **open**?"
    },
    {
      script: "I hear you. {/} It feels **high**. {/} The price matches the **scope** we walked. {/} I am not going to **rush** you. {/} If the full package is more than you want, {/} we can look at a **smaller** scope {/} that still does the job **right**. {/} Want me to show you that option?"
    },
    {
      script: "I **appreciate** you asking. {/} I am not able to **lower** the price {/} for the same service. {/} That price is what keeps the work **consistent** {/} and done **right**. {/} What I **can** do {/} is adjust what is included {/} so it fits your **budget**. {/} Would you like me to show you that option?"
    },
    {
      script: "Mrs. Carter — {/} let me jump in for **one** second. {/} That is really **helpful**. {/} So the **front** beds are the priority, {/} and you want holiday lights **too**. {/} Your price is **[price]**. {/} ~[pause — count to 3 silently]~ {/} Are you ready to say **yes**?"
    }
  ];

  var TWISTERS = [
    {
      lines: [
        "**Th**ree **th**ousand **th**in **th**orns **th**rough **th**e hedge.",
        "**Th**is is **th**e **th**ird **th**ing **th**at **th**ey **th**ought about."
      ],
      business: "**Th**ank you — I **th**ink **th**at's **th**e best option for **th**e property."
    },
    {
      lines: [
        "**V**ery **b**ig **v**ans **b**ring **v**aluable **b**ark.",
        "The **b**est **v**iew is **b**ehind the **v**ine."
      ],
      business: "I **v**isit, I re**v**iew the **b**eds, and I **b**ring real **v**alue."
    },
    {
      lines: [
        "sit / seat — fill / feel — ship / sheep — live / leave — hill / heal",
        "T**i**m w**i**ll f**i**ll the b**i**n — then l**ea**ve the **ea**st f**ie**ld cl**ea**n."
      ],
      business: "If it f**i**ts, we'll k**ee**p the beds cl**ea**n."
    },
    {
      lines: [
        "We trim**med** the ol**d** ben**t** plan**ts** las**t** wee**k**.",
        "The bes**t** fron**t** yar**d** nex**t** stree**t**."
      ],
      business: "The firs**t** visi**t** is jus**t** a walk and a tal**k**."
    },
    {
      lines: [
        "We **raked**, **trimmed**, and **planted** — then we **washed** the walks and **started** the next yard.",
        "I **listed** the work, **confirmed** the scope, and **asked** for the yes."
      ]
    },
    {
      lines: [
        "**Sh**e **ch**ose **sh**ort **ch**ips for the **sh**ady **ch**urch.",
        "**Ch**eck the **sh**rubs, then **ch**op the **sh**oots."
      ],
      business: "I'll **sh**ow you the **ch**oices and **sh**are what **ch**anged."
    },
    {
      lines: [
        "**Z**ack's **z**ebra **z**ig**z**ags in the **z**one.",
        "The tree**s** i**s** ea**s**y — the home**s** need the**s**e."
      ],
      business: "Our plan**s** cover home**s**, tree**s**, and shrub**s**."
    }
  ];

  var PITCH = [
    "Hi, {/} I'm **Ricardo**, {/} with **Spring Landscape** {/} and **Winter Bright**, {/} here in **Auburn**. {//}",
    "We care for **lawns**, {/} beds, {/} and shrubs, {/} and we install **holiday lighting** {/} when the season turns. {//}",
    "We walk the property **with** you, {/} explain what it **needs**, {/} and give you a **clear** price. {//}",
    "For **maintenance**, {/} you choose a **package** that fits: {/} a fuller visit {/} or a lighter plan. {/} **Both** get the same care. {//}",
    "For holiday lights, {/} **Winter Bright** handles the design, {/} the install, {/} and the takedown. {//}",
    "Your price is **[price]**. {/} ~[pause — count to 3 silently]~ {//}",
    "If it feels **right**, {/} the next step is a **yes**. {/} I would be glad to earn your **trust**. {//}",
    "**Thank you.**"
  ];

  var MAIN = [
    "Hi, Mrs. Carter. {/} This is **Ricardo** {/} with **Spring Landscape** {/} and **Winter Bright**. {//}",
    "You reached out about the property, {/} so I am following up **myself**. {//}",
    "On a visit, {/} we walk it **together**. {/} I ask what is **bothering** you, {/} and I show a maintenance **package** {/} for the lawn, {/} the beds, {/} and the shrubs. {//}",
    "If holiday lighting matters, {/} **Winter Bright** can design it, {/} install it, {/} and take it down. {//}",
    "Your price is **[price]**. {/} ~[pause — count to 3 silently]~ {//}",
    "If that feels **right**, {/} I am asking for the **yes**. {/} What should we **clear** up first?"
  ];

  var EN = {
    subtitle: "A 4-week sales practice plan for Ricardo — Spring Landscape and Winter Bright",
    ui: {
      greeting: "Hi, Ricardo.",
      appTitle: "Ricardo's Speech Coach",
      tabToday: "Today",
      tabDrill: "Drill",
      tabLessons: "Lessons",
      tabScript: "Script",
      tabScore: "Score",
      titleToday: "Today",
      titleDrill: "Daily Drill",
      titleLessons: "Lessons",
      titleScript: "Sales Script",
      titleScore: "Self-Score",
      readAloud: "Read aloud",
      readScript: "Read script",
      readLine: "Read line",
      slowerOn: "Slower voice: on",
      slowerOff: "Slower voice",
      stopVoice: "Stop voice",
      planNotStartedTitle: "Plan not started",
      planNotStartedBody: "Day 1 is {date}. The drill and the lessons are here whenever you want them.",
      startDrill: "Start the 10-minute drill",
      browseLessons: "Browse the 11 lessons",
      planCompleteTitle: "Plan complete",
      planCompleteBody: "The 4 weeks are finished. Keep the daily drill, the lessons, the 60-second pitch, and the self-score. Restart when you want a new Day 1.",
      reviewAllLessons: "Review all lessons",
      restartPlan: "Restart the plan",
      weekOf: "Week {week} of 4 · Day {day} of 28",
      weekLessonsNote: "This week's lessons: {lessons}. They rotate through the seven days. Day 7 reviews them.",
      todayReviewAll: "Today: review all 11 lessons",
      todayReviewAllBody: "Say the practice scripts out loud. Week 4 calls this review all.",
      openLessons: "Open the lessons",
      todayReviewWeek: "Today: review this week's lessons",
      lessonWord: "Lesson",
      todaysLesson: "Today's lesson",
      startLesson: "Start lesson {n}",
      extraWeek: "Extra this week:",
      sundayTitle: "Sunday self-score",
      openScore: "Open the weekly self-score",
      restartAsk: "Restart from today?",
      restartBody: "Day 1 becomes today. Scores and completed lessons stay on this phone.",
      restartYes: "Restart from today",
      restartNo: "Keep the current start date",
      fourWeek: "The 4-week plan",
      lessonsWord: "Lessons:",
      extraWord: "Extra:",
      planListNote: "The week-by-week plan is the list above.",
      settings: "Settings",
      startDate: "Plan start date",
      startDateHelp: "The first time you open the app, this is set to that day. Change it if you started earlier or later.",
      version: "Version",
      privacy: "No account. No analytics. Practice stays in this browser on this phone.",
      timerEyebrow: "10-minute drill timer",
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      reset: "Reset",
      suggestedNow: "Suggested now: ",
      drillDoneSuggest: "Drill complete.",
      tenMinutes: "Ten minutes. That drill is done.",
      timeThisStep: "Time this step ({time})",
      timeSec: "Time {n} sec",
      prevStep: "Previous step",
      nextStep: "Next step",
      howTo: "How to:",
      businessLine: "Business line:",
      openPitch: "Open the 60-second pitch",
      allLessons: "All lessons",
      keyIdea: "Key idea",
      techniques: "Techniques",
      exercise5: "5-minute exercise",
      markComplete: "Mark complete",
      markUndo: "Completed — tap to undo",
      reviewDay: "Today is a review day. Say the scripts out loud.",
      todayPill: "Today",
      donePill: "Complete",
      record: "Record",
      record30: "Record a 30-second clip",
      teleprompter: "Teleprompter",
      close: "Close",
      play: "Play",
      speed: "Speed",
      textSize: "Text",
      pastWeeks: "Past weeks",
      noWeeks: "Weeks you score show up here and stay on this phone.",
      totalWord: "Total",
      skillsScored: "{n} of {total} skills scored",
      weekWord: "Week",
      savedWeek: "Saved week",
      scoreScaleNote: "The daily-drill row is scored 1–5, same as the other skills, so the total is 75.",
      marksLead: "How to read the marks:",
      markShort: "short pause (half a second)",
      markLong: "longer pause (one full second — breathe)",
      markBold: "stress this word (a little louder, a little slower)",
      boldWord: "Bold",
      recTitle: "Record",
      recPrivacy: "Recordings stay on this phone only. Nothing is uploaded.",
      recRecord: "Record",
      recStop: "Stop",
      noClips: "No clips yet.",
      playClip: "Play",
      discard: "Discard",
      savedPhone: "Saved on this phone. It is not uploaded.",
      savedVisit: "Saved for this visit only. It is not uploaded.",
      nothingCaptured: "Nothing was captured. Try recording again.",
      recordingNow: "Recording… tap Stop when you are done.",
      clipGone: "That clip isn't available anymore.",
      playbackFailed: "Playback didn't start. Use the audio controls under the list. The clip stays on this phone.",
      discarded: "Clip discarded. It was only on this phone.",
      readAloudUnavailable: "Read-aloud isn't available in this browser. Read the line out loud yourself.",
      micBlocked: "The microphone is blocked. You can allow it in the browser settings, or practice out loud. Recordings never leave this phone.",
      micMissing: "No microphone was found. You can still practice out loud. Nothing is uploaded.",
      micUnusable: "The microphone couldn't be used just now. You can still practice out loud. Nothing is uploaded.",
      recUnavailable: "Recording isn't available in this browser. You can still practice out loud. Nothing is uploaded.",
      recStoppedUnsaved: "Recording stopped, but the clip could not be saved. Nothing was uploaded.",
      doneWord: "done",
      secWord: "sec",
      langGroup: "Language",
      englishBadge: "",
      drillStepsLabel: "Drill steps",
      scoreWeeksLabel: "Plan weeks",
      recordDrill: "Daily drill",
      recordPitch: "60-second pitch",
      recordMain: "Main sales script",
      recordVoicemail: "Voicemail",
      recordLesson: "Lesson {n}",
      sectionsLabel: "Sections"
    },
    howTo: {
      heading: "1. How to Use This",
      paragraphs: [
        "This plan is for you, Ricardo. You sell for Spring Landscape and Winter Bright, in English, to English-speaking customers. You do not need a studio. You need your phone, a quiet spot, and **15–20 minutes a day**."
      ],
      routineLead: "Your daily routine (15–20 min):",
      routine: [
        "**10 minutes:** the daily articulation drill. Same drill every day. Repetition is what changes your mouth habits.",
        "**5–10 minutes:** one charisma lesson. Read the key idea, say the practice script out loud, and do the 5-minute exercise."
      ],
      planLead: "The 4-week plan:",
      rulesLead: "Simple rules:",
      rules: [
        "**Say everything out loud.** Reading silently does not train your mouth.",
        "**Record often.** Your phone is your coach. You will hear things you never notice while talking.",
        "**Spanish is a strength, not a problem.** The goal is not to lose your accent. The goal is to be **clear, calm, and easy to follow**. Customers trust a salesperson who sounds sure — accent included.",
        "**The lines stay in English.** Practice scripts, tongue twisters, and the teleprompter stay in English, because that is the language of the sale. Español translates the coaching, not the words you say to the customer.",
        "**Small wins count.** If you miss a day, pick it up the next day. Do not restart from zero.",
        "**Fill in the weekly self-score** every Sunday."
      ]
    },
    weeks: [
      {
        week: 1,
        focus: "Clear sounds + strong first impression",
        lessonsLabel: "1, 2, 3",
        lessonIds: [1, 2, 3],
        extra: "Record yourself reading the 60-second pitch once (baseline)"
      },
      {
        week: 2,
        focus: "Presence + stories",
        lessonsLabel: "4, 5, 6",
        lessonIds: [4, 5, 6],
        extra: "Practice the 60-second pitch 3 times this week"
      },
      {
        week: 3,
        focus: "Reading the customer + hard conversations",
        lessonsLabel: "7, 8, 9",
        lessonIds: [7, 8, 9],
        extra: "Use one technique on a real call or site visit every day"
      },
      {
        week: 4,
        focus: "Boundaries + the close",
        lessonsLabel: "10, 11, review all",
        lessonIds: [10, 11],
        extra: "Record your final 60-second pitch"
      }
    ],
    drill: {
      heading: "2. Daily 10-Minute Articulation Drill",
      intro: "Do these in order. Use a timer.",
      steps: [
        {
          id: "warmup",
          title: "Step 1 — Warm-Up",
          shortTitle: "Warm-Up",
          minutesLabel: "2 minutes",
          seconds: 120,
          parts: [
            {
              label: "Belly breathing",
              seconds: 30,
              text: "Hand on your stomach. Breathe in through your nose for 4 counts — your stomach moves out, not your shoulders. Breathe out slowly for 6 counts. Repeat 3 times."
            },
            {
              label: "Lip trills",
              seconds: 30,
              text: "Blow air through closed, relaxed lips so they buzz like a motor (\"brrrrr\"). Slide your voice low to high and back."
            },
            {
              label: "Jaw release",
              seconds: 30,
              text: "Open your mouth wide like a big yawn, hold 2 seconds, close. Then move your jaw gently side to side. Massage the muscles in front of your ears."
            },
            {
              label: "Tongue stretch",
              seconds: 30,
              text: "Stick your tongue out and down, hold. Then touch the roof of your mouth behind your top teeth. Then sweep it around the inside of your lips 5 times each way."
            }
          ]
        },
        {
          id: "overart",
          title: "Step 2 — Over-Articulation Reading",
          shortTitle: "Over-Articulation",
          minutesLabel: "2 minutes",
          seconds: 120,
          paragraphs: [
            "Read the paragraph below **slowly and with exaggerated mouth movement** — like you are talking to someone across a noisy yard who reads lips. Open your mouth more than feels normal. Hit every last sound of every word."
          ],
          quoteNote: "This paragraph is a sales call. Read it in English.",
          after: "Then read it again at **normal speed**, keeping the same clean endings. The second read sounds sharper."
        },
        {
          id: "twisters",
          title: "Step 3 — Tongue Twisters for Spanish-Speaker Sounds",
          shortTitle: "Tongue Twisters",
          minutesLabel: "3 minutes",
          seconds: 180,
          intro: "Pick **3–4 sets per day** and rotate. Say each line 3 times: slow, medium, then natural speed. Accuracy first, speed later. The lines stay in English.",
          sets: [
            {
              title: "TH (soft \"th\" in ~think~ and voiced \"th\" in ~this~)",
              how: "Put the tip of your tongue lightly **between your teeth** and blow air. Not \"t\" or \"d,\" not \"s\" or \"z.\""
            },
            {
              title: "V vs. B",
              how: "**V** = top teeth gently touch your bottom lip and the sound buzzes. **B** = both lips press together and pop."
            },
            {
              title: "Short I (~sit~) vs. Long EE (~seat~)",
              how: "Short **i** is relaxed and quick, mouth barely open. Long **ee** is a big smile, longer sound.",
              lineLabels: ["Pairs:", ""]
            },
            {
              title: "Final consonants (don't drop the last sound)",
              how: "Finish every word. The last sound is short but **clear** — t, d, k, p, s, st."
            },
            {
              title: "-ED endings (three sounds: t / d / id)",
              howParagraphs: [
                "After sounds like p, k, s, sh, ch, f → **\"t\"**: ~raked~ = \"raykt,\" ~fixed~ = \"fikst,\" ~washed~ = \"washt.\"",
                "After voiced sounds (b, g, v, z, m, n, l, r, vowels) → **\"d\"**: ~trimmed~ = \"trimd,\" ~cleaned~ = \"kleend,\" ~called~ = \"kawld.\"",
                "After t or d → **\"id\"** (extra syllable): ~planted~ = \"plan-tid,\" ~needed~ = \"nee-did,\" ~started~ = \"star-tid.\""
              ]
            },
            {
              title: "SH vs. CH",
              how: "**SH** is soft, continuous air (\"shhh\" like asking for quiet). **CH** starts with a little stop (\"t\" + \"sh\")."
            },
            {
              title: "Z (buzzing \"z\")",
              how: "Same mouth as \"s,\" but turn your voice **on** — you should feel a buzz in your throat. Many words spelled with \"s\" are actually \"z\": ~is, was, has, trees, homes, shrubs~.",
              lineNotes: ["", "(all **z** sounds)"],
              businessNote: "(plans = \"planz,\" homes = \"homz,\" trees = \"treez,\" shrubs = \"shrubz\")"
            }
          ]
        },
        {
          id: "pace",
          title: "Step 4 — Pace Control",
          shortTitle: "Pace Control",
          minutesLabel: "1.5 minutes",
          seconds: 90,
          paragraphs: [
            "**Target pace: about 140–160 words per minute.** That is calm, clear, and easy for a customer to follow.",
            "**How to check:** Read the 60-second pitch out loud with a timer. Count the words you finished in one minute. Too fast? Add more pauses. Too slow? Shorten the pauses. Do not rush the words.",
            "**Tip:** When you are nervous, you speed up. Slow down **on purpose** for the price and for anything you need them to remember."
          ]
        },
        {
          id: "fillers",
          title: "Step 5 — Pause Instead of Filler Words",
          shortTitle: "Pause Instead of Fillers",
          minutesLabel: "1 minute",
          seconds: 60,
          paragraphs: [
            "Filler words — \"um,\" \"eh,\" \"like,\" \"you know,\" \"o sea,\" \"este\" — make you sound unsure. A **silent pause** makes you sound thoughtful and in control.",
            "**Drill:** Talk for 60 seconds about what a maintenance visit includes. Every time you feel a filler coming, **close your mouth and pause** for one second instead.",
            "**Rule:** Pause **before** a key point and **after** a price. Silence is not awkward. It is part of the close."
          ]
        },
        {
          id: "record",
          title: "Step 6 — Record & Review Checklist",
          shortTitle: "Record and Review",
          minutesLabel: "30 seconds to record, review later",
          seconds: 30,
          paragraphs: [
            "Record one 30-second clip a day (a business line, the sales-call paragraph, or part of the pitch). Listen once and check:"
          ],
          checks: [
            "Could a stranger understand every word?",
            "Did I finish my word endings (t, d, s, -ed)?",
            "Did I hit my target sounds (th, v, z, short i)?",
            "Was my pace calm (not rushing)?",
            "How many filler words? (Goal: fewer every week.)",
            "Did my voice go **down** at the end of sentences (sure) instead of **up** (sounds like a question)?",
            "Did I sound warm — like a customer would want to say yes?"
          ]
        }
      ]
    },
    lessonsIntro: {
      heading: "3. Eleven Charisma Lessons (\"Unlock Your Charisma\")",
      text: "Do one lesson per practice day. Each lesson has a key idea, techniques, an English practice script from a sales situation, and a 5-minute exercise."
    },
    lessons: [
      {
        id: 1,
        title: "First Impressions",
        keyIdea: "People decide fast whether they like and trust you — usually before you talk about price. Your first seconds (face, greeting, voice, first sentence) set the tone for the whole visit. Make the first moment about **them**, not about the pitch.",
        techniques: [
          "**Arrive on:** Before you get out of the truck, take one slow breath, relax your shoulders, and smile. Start the visit already calm.",
          "**Name + smile + eye contact:** Use the customer's name in your first sentence. Look them in the eye for a full second.",
          "**Open with a question about them,** not a pitch about you.",
          "**Use a warm, lower voice** — not loud, not rushed."
        ],
        scriptTitle: "Practice script — opening an estimate or a site visit:",
        purpose: "For opening an estimate or a site visit. Say it in English.",
        exercise: "Stand in front of a mirror, or prop up your phone. Say the opening 5 times. Each time, change one thing: a bigger smile, a slower first sentence, steadier eye contact, a lower voice, a longer pause after their name. Keep the version you trust and use it on the next real visit."
      },
      {
        id: 2,
        title: "Build Trust with Your Voice",
        keyIdea: "On a call, the customer judges you by how you sound. A steady, warm voice with clear endings sounds trustworthy. A fast, rising, or thin voice sounds unsure. Your voice should say: I know this work, and I care.",
        techniques: [
          "**Downward endings:** End statements with your voice going **down**. Going up makes a fact sound like a question.",
          "**Slow down on the point of the call:** why you are calling, and the next step.",
          "**Speak from your belly:** use the warm-up breath so the voice is full, not thin.",
          "**Warmth:** a slight smile while you talk. People can hear it, even on the phone."
        ],
        scriptTitle: "Practice script — calling a new lead:",
        purpose: "For calling a new lead. Say it in English.",
        script2Title: "Practice script — leaving a voicemail:",
        script2Purpose: "For a voicemail when they do not pick up. Say it in English. Do not leave a phone number in the message.",
        exercise: "Record the call script twice: once with your voice going up at the end of every sentence, once going down. Listen. Keep the one you would trust. Then record the voicemail once, under 30 seconds, and check that you never rush the company names."
      },
      {
        id: 3,
        title: "Say the Price and Stop",
        keyIdea: "Confidence is not hoping they say yes. It is being calm about the value. When you state a price, they watch your face and hear your voice. If you flinch, apologize, or rush, the price sounds soft. Say it once, clearly, then **stop talking**.",
        techniques: [
          "**State, don't ask:** \"Your price is…\" — not \"Would it be okay if…\"",
          "**No apology words:** drop \"just,\" \"only,\" \"sorry, but,\" \"I know it's a lot.\"",
          "**Price, then three seconds of silence.** Count to three in your head. Do not fill it.",
          "**Still body:** feet planted, shoulders back, hands still."
        ],
        scriptTitle: "Practice script — stating the price, then silence:",
        purpose: "For stating the price, then three seconds of silence. Say it in English. [price] is a placeholder.",
        note: "When you practice out loud, say the real price. Do not type the number into this app. Say it calm and flat, then hold the silence.",
        exercise: "Pick 5 prices you quote often. Say each one out loud 5 times, and after each one stay silent for 3 seconds. Record one round. Listen for a rushed number, a voice that rises, or a silence you filled. Do not write the numbers here."
      },
      {
        id: 4,
        title: "Present the Packages",
        keyIdea: "A household is a small room. Know your first line and your last line, slow down, and talk to one person at a time while you finish a thought. Three options are enough. Nerves are normal — use them as energy, not speed.",
        techniques: [
          "**Memorize the first and last sentence.** The middle can be notes.",
          "**One person, one thought:** look at one person until the sentence ends, then move.",
          "**Three-point rule:** lighter plan, fuller plan, maintenance plus holiday lighting.",
          "**Breathe before you start:** 4 in, 6 out — then begin."
        ],
        scriptTitle: "Practice script — presenting maintenance packages:",
        purpose: "For presenting maintenance packages. Say it in English.",
        exercise: "Stand up. Place three objects in the room. They are the people listening. Give the package script, looking at a different object for each option. Do it 3 times. On the last round, add one sentence of your own without adding a fourth package."
      },
      {
        id: 5,
        title: "Tell a Customer Story",
        keyIdea: "People forget a list of tasks and remember a story. A simple story has a before, a problem, what you did, and the after. One detail makes it real. The story lets the customer see their own place.",
        techniques: [
          "**Before, problem, action, after.** Keep it to 4–6 sentences.",
          "**One specific detail** — a front walk, a hedge, a bed.",
          "**Show the feeling** before and after.",
          "**End on them:** what it means for this customer."
        ],
        scriptTitle: "Practice script — a story on a site visit:",
        purpose: "For a customer story on a visit. Say it in English. Mrs. Bennett is a made-up name.",
        note: "Mrs. Bennett is not a real customer. You can swap in a story from your own work. Keep that person's name private.",
        exercise: "Write one story from your work in 4–6 short lines: before, problem, action, after. Tell it out loud 3 times without reading. Record the last one. Check: one clear detail, and under one minute."
      },
      {
        id: 6,
        title: "Body Language",
        keyIdea: "Your body talks before your mouth does. Open, relaxed, steady posture says you are trustworthy and in charge. Crossed arms, a dropped gaze, or fidgeting can undo a good sentence.",
        techniques: [
          "**Open posture:** arms uncrossed, hands visible, chest open.",
          "**Stand at an angle** beside the customer while you look at the yard together. It feels like a partnership.",
          "**Point with an open hand,** not one finger.",
          "**Still hands while you talk about the price.** Fidgeting sounds like doubt.",
          "**Nod slowly** when they speak. It shows you are listening."
        ],
        scriptTitle: "Practice script — walking the property side by side:",
        purpose: "For walking the property side by side. Say it in English.",
        exercise: "Prop up your phone and record yourself doing the script while you walk around a room. Watch it with the sound off. Ask: Do I look calm? Are my hands open? Would a customer trust this person? Fix one thing and record again."
      },
      {
        id: 7,
        title: "Read the Customer",
        keyIdea: "Good salespeople listen with their eyes as well as their ears. Notice whether the customer is rushed, worried, price-focused, or detail-focused, and adjust. This is not mind-reading. It is paying attention and asking.",
        techniques: [
          "**Watch for signs:** phone or the door = rushed, so keep it short. Lots of questions = they want detail. Arms crossed and \"how much?\" early = price first, then value.",
          "**Match their pace:** a fast talker gets a slightly quicker, direct version. A slow talker gets a slower one.",
          "**Ask, don't assume:** \"Do you want the short version or the full walk-through?\"",
          "**Listen for the real worry** behind the question."
        ],
        scriptTitle: "Practice script — checking what the customer wants:",
        purpose: "For reading what the customer wants on a call or a visit. Say it in English.",
        exercise: "Think of your last 3 customer conversations. For each, write one line: what they seemed to feel, what they cared about, and what you would say differently now. Then say the script twice: once fast and short, once slow and detailed."
      },
      {
        id: 8,
        title: "Follow Up Clearly",
        keyIdea: "A quiet estimate does not need a long speech. A good follow-up is soon, specific, and respectful. Talk about the decision, not about cornering them. Then give a clear next step and stop.",
        techniques: [
          "**Soon, and direct.** Do not let the estimate sit in silence.",
          "**Fact, why it matters, next step.** What you sent, why a clear number helps, and the question you need answered.",
          "**Short:** under one minute.",
          "**A yes or a no both count.** Say that, and mean it. Pressure is not clarity."
        ],
        scriptTitle: "Practice script — following up on a lead:",
        purpose: "For following up after a visit or a sent estimate. Say it in English.",
        exercise: "Pick one real estimate that is still open. Write a follow-up in 3 or 4 sentences: fact, why it matters, next step. Say it out loud 3 times, under 45 seconds, in a calm voice. Record the last take."
      },
      {
        id: 9,
        title: "Handle \"Too Expensive\"",
        keyIdea: "Someone who says the price is high wants to feel heard before they hear a solution. If you argue, they push harder. Stay calm, slow down, repeat the worry, then move to the scope and a clear option.",
        techniques: [
          "**Lower and slower:** when they get louder, you get calmer.",
          "**Name it:** \"I hear you. It feels high.\"",
          "**Facts, not a debate:** the price matches the scope you walked.",
          "**Offer a smaller scope,** never a lower price for the same work.",
          "**Don't take it personally.** It is the decision, not a verdict on you."
        ],
        scriptTitle: "Practice script — when they say it is too expensive:",
        purpose: "For handling \"too expensive.\" Say it in English.",
        exercise: "Have someone play an unhappy customer, or record both sides yourself. Run the script twice. Your only goals: voice low and slow, no interrupting, and an ending that offers a smaller scope instead of a discount."
      },
      {
        id: 10,
        title: "Say No to a Discount",
        keyIdea: "Saying no protects the price and the quality of the work. A good no is short, kind, and gives a real option. Long excuses sound like guilt and invite bargaining. You can be warm and firm at the same time.",
        techniques: [
          "**Thank, no, short why, option.**",
          "**Don't over-explain.** Extra reasons sound like you might fold.",
          "**Offer a different scope,** never a lower price for the same work.",
          "**Same calm voice** you use when you state a price."
        ],
        scriptTitle: "Practice script — saying no to a discount:",
        purpose: "For a discount ask. Say it in English.",
        exercise: "Write 3 things customers ask that you want to decline: a discount, a free extra, a promise you cannot keep. For each, write thank, no, why, option in 3 sentences. Say each out loud 3 times. Record the hardest one."
      },
      {
        id: 11,
        title: "Ask for the Yes",
        keyIdea: "A long conversation still needs a decision. Interrupting politely is how you get there: use their name, show you heard them, then ask for the yes. It respects both of you.",
        techniques: [
          "**Use their name.** It gets attention without a hard tone.",
          "**Bridge:** \"Let me jump in for one second\" or \"That is helpful, so…\"",
          "**Summarize in one sentence** so they feel heard.",
          "**Ask for the yes.** A visit with no ask is a tour, not a close."
        ],
        scriptTitle: "Practice script — closing by asking for the yes:",
        purpose: "For closing by asking for the yes. Say it in English.",
        exercise: "Play two minutes of someone talking. Pause it at random moments and practice out loud: name, bridge, one-sentence summary, then the ask. Do it 5 times. End every round with the question, then silence."
      }
    ],
    pitch: {
      heading: "4. 60-Second Pitch",
      intro: "This is the teleprompter script for Spring Landscape and Winter Bright. Practice it in English.",
      purpose: "A 60-second pitch for a call, a door, or a camera. The words stay in English.",
      timing: "About 100 words. With the pauses, at a calm pace, this runs about 60 seconds.",
      note: "Before you record, make sure every line matches what you actually offer. Do not promise how long a visit takes, how many people come, or a set day. When you practice out loud, say the real price. Do not type that number into this app. [price] is only a placeholder.",
      rehearsal: {
        heading: "Rehearsal routine",
        beforeLead: "Days before you record (week 4):",
        before: [
          "**Read it 3 times out loud** with the pause and stress marks. Do not worry about memorizing.",
          "**Mark your trouble words** — likely ones: ~Auburn, shrubs, lighting, maintenance, package, property, price, trust~. Say each one slowly 5 times.",
          "**Learn the first and last lines by heart.** The middle can stay on the phone, just below the camera."
        ],
        dayLead: "Recording day:",
        day: [
          "**Warm up** (step 1 of the daily drill — 2 minutes).",
          "**Set up:** camera at eye level, light on your face, quiet spot.",
          "**Record 3 takes:**",
          "**Take 1 — Natural:** just get through it.",
          "**Take 2 — Slower:** a little more pause at every //.",
          "**Take 3 — Warmest:** smile through it, as if you are talking to one neighbor."
        ],
        reviewLead: "Review each take with this checklist:",
        review: [
          "The pitch runs about 60 seconds",
          "Every word is clear — especially ~Auburn, shrubs, lighting, price, trust~",
          "Final sounds are clean",
          "No filler words",
          "Voice goes **down** at the end of sentences",
          "Eyes on the camera or the person, not on the screen",
          "Shoulders relaxed, face friendly",
          "The ending feels warm, not rushed"
        ],
        close: "**Pick the best take.** If none is good enough, rest 10 minutes and record 3 more. Usually a later take is the one."
      }
    },
    mainScript: {
      heading: "Main sales script",
      purpose: "A live call you can use beside the pitch: follow up, walk the property, name the package, state the price, ask for the yes. Say it in English.",
      note: "[price] is a placeholder. Say the real number out loud. Do not store it here."
    },
    voicemail: {
      heading: "Voicemail",
      purpose: "The same voicemail as lesson 2, kept here so you can practice it next to the pitch. Say it in English.",
      note: "Do not leave a phone number, an email, or a street address in the message."
    },
    score: {
      heading: "5. Weekly Self-Score",
      intro: "Every Sunday, score yourself **1–5** (1 = needs a lot of work, 5 = strong). Be honest. This is only for you. Listen to one recording from the week before you score.",
      scale: "1 = needs a lot of work, 5 = strong. The total is out of 75.",
      skills: [
        "Did the daily drill (days out of 7)",
        "TH sounds clear",
        "V vs. B clear",
        "Short i vs. long ee",
        "Final consonants and -ed endings",
        "SH / CH and Z sounds",
        "Pace (calm, about 140–160 words per minute)",
        "Pauses instead of filler words",
        "Confident voice (endings go down)",
        "First impression on calls and visits",
        "Stating the price, then three seconds of silence",
        "Body language (open, calm hands)",
        "Handling \"too expensive\" and discount asks",
        "Asking for the yes",
        "60-second pitch delivery"
      ],
      winLabel: "One win this week:",
      nextLabel: "One thing to focus on next week:",
      close: "Keep going. Clear, calm, and warm beats perfect every time."
    }
  };

  var ES = {
    subtitle: "Un plan de ventas de 4 semanas para Ricardo — Spring Landscape y Winter Bright",
    ui: {
      greeting: "Hola, Ricardo.",
      appTitle: "Ricardo's Speech Coach",
      tabToday: "Hoy",
      tabDrill: "Ejercicio",
      tabLessons: "Lecciones",
      tabScript: "Guion",
      tabScore: "Puntaje",
      titleToday: "Hoy",
      titleDrill: "Ejercicio diario",
      titleLessons: "Lecciones",
      titleScript: "Guion de ventas",
      titleScore: "Autoevaluación",
      readAloud: "Leer en voz alta",
      readScript: "Leer el guion",
      readLine: "Leer la línea",
      slowerOn: "Voz más lenta: sí",
      slowerOff: "Voz más lenta",
      stopVoice: "Detener la voz",
      planNotStartedTitle: "El plan no ha empezado",
      planNotStartedBody: "El día 1 es {date}. El ejercicio y las lecciones están aquí cuando quieras.",
      startDrill: "Empezar el ejercicio de 10 minutos",
      browseLessons: "Ver las 11 lecciones",
      planCompleteTitle: "Plan completo",
      planCompleteBody: "Las 4 semanas terminaron. Sigue con el ejercicio diario, las lecciones, el guion de 60 segundos y la autoevaluación. Reinicia cuando quieras un nuevo día 1.",
      reviewAllLessons: "Repasar todas las lecciones",
      restartPlan: "Reiniciar el plan",
      weekOf: "Semana {week} de 4 · Día {day} de 28",
      weekLessonsNote: "Lecciones de esta semana: {lessons}. Rotan durante los siete días. El día 7 las repasas.",
      todayReviewAll: "Hoy: repasa las 11 lecciones",
      todayReviewAllBody: "Di los guiones en voz alta. La semana 4 llama a esto repaso general.",
      openLessons: "Abrir las lecciones",
      todayReviewWeek: "Hoy: repasa las lecciones de esta semana",
      lessonWord: "Lección",
      todaysLesson: "Lección de hoy",
      startLesson: "Empezar la lección {n}",
      extraWeek: "Extra de esta semana:",
      sundayTitle: "Autoevaluación del domingo",
      openScore: "Abrir la autoevaluación semanal",
      restartAsk: "¿Reiniciar desde hoy?",
      restartBody: "El día 1 pasa a ser hoy. Los puntajes y las lecciones completadas se quedan en este teléfono.",
      restartYes: "Reiniciar desde hoy",
      restartNo: "Dejar la fecha actual",
      fourWeek: "El plan de 4 semanas",
      lessonsWord: "Lecciones:",
      extraWord: "Extra:",
      planListNote: "El plan semana por semana es la lista de arriba.",
      settings: "Ajustes",
      startDate: "Fecha de inicio del plan",
      startDateHelp: "La primera vez que abres la aplicación, se pone el día de hoy. Cámbiala si empezaste antes o después.",
      version: "Versión",
      privacy: "Sin cuenta. Sin analítica. La práctica se queda en este navegador, en este teléfono.",
      timerEyebrow: "Temporizador de 10 minutos",
      start: "Empezar",
      pause: "Pausa",
      resume: "Reanudar",
      reset: "Reiniciar",
      suggestedNow: "Ahora toca: ",
      drillDoneSuggest: "Ejercicio listo.",
      tenMinutes: "Diez minutos. Este ejercicio ya está.",
      timeThisStep: "Medir este paso ({time})",
      timeSec: "Tiempo {n} s",
      prevStep: "Paso anterior",
      nextStep: "Siguiente paso",
      howTo: "Cómo:",
      businessLine: "Frase de ventas:",
      openPitch: "Abrir el guion de 60 segundos",
      allLessons: "Todas las lecciones",
      keyIdea: "Idea clave",
      techniques: "Técnicas",
      exercise5: "Ejercicio de 5 minutos",
      markComplete: "Marcar como hecha",
      markUndo: "Hecha — toca para deshacer",
      reviewDay: "Hoy es día de repaso. Di los guiones en voz alta.",
      todayPill: "Hoy",
      donePill: "Hecha",
      record: "Grabar",
      record30: "Grabar un clip de 30 segundos",
      teleprompter: "Apuntador",
      close: "Cerrar",
      play: "Reproducir",
      speed: "Velocidad",
      textSize: "Texto",
      pastWeeks: "Semanas anteriores",
      noWeeks: "Las semanas que evalúes aparecen aquí y se quedan en este teléfono.",
      totalWord: "Total",
      skillsScored: "{n} de {total} habilidades evaluadas",
      weekWord: "Semana",
      savedWeek: "Semana guardada",
      scoreScaleNote: "La fila del ejercicio diario también va del 1 al 5, igual que las otras, así que el total es 75.",
      marksLead: "Cómo leer las marcas:",
      markShort: "pausa corta (medio segundo)",
      markLong: "pausa larga (un segundo completo — respira)",
      markBold: "énfasis en esta palabra (un poco más fuerte y más lenta)",
      boldWord: "Negrita",
      recTitle: "Grabar",
      recPrivacy: "Las grabaciones se quedan solo en este teléfono. No se sube nada.",
      recRecord: "Grabar",
      recStop: "Detener",
      noClips: "Todavía no hay clips.",
      playClip: "Reproducir",
      discard: "Borrar",
      savedPhone: "Guardado en este teléfono. No se subió.",
      savedVisit: "Guardado solo durante esta visita. No se subió.",
      nothingCaptured: "No se captó nada. Intenta grabar otra vez.",
      recordingNow: "Grabando… toca Detener cuando termines.",
      clipGone: "Ese clip ya no está.",
      playbackFailed: "La reproducción no empezó. Usa los controles de audio debajo de la lista. El clip se queda en este teléfono.",
      discarded: "Clip borrado. Solo estaba en este teléfono.",
      readAloudUnavailable: "La lectura en voz alta no está en este navegador. Lee la línea tú mismo.",
      micBlocked: "El micrófono está bloqueado. Puedes permitirlo en los ajustes del navegador, o practicar en voz alta. Las grabaciones nunca salen de este teléfono.",
      micMissing: "No se encontró micrófono. Igual puedes practicar en voz alta. No se sube nada.",
      micUnusable: "El micrófono no se pudo usar ahora. Igual puedes practicar en voz alta. No se sube nada.",
      recUnavailable: "La grabación no está disponible en este navegador. Igual puedes practicar en voz alta. No se sube nada.",
      recStoppedUnsaved: "La grabación se detuvo, pero el clip no se pudo guardar. No se subió nada.",
      doneWord: "listo",
      secWord: "s",
      langGroup: "Idioma",
      englishBadge: "En inglés",
      drillStepsLabel: "Pasos del ejercicio",
      scoreWeeksLabel: "Semanas del plan",
      recordDrill: "Ejercicio diario",
      recordPitch: "Guion de 60 segundos",
      recordMain: "Guion principal",
      recordVoicemail: "Mensaje de voz",
      recordLesson: "Lección {n}",
      sectionsLabel: "Secciones"
    },
    howTo: {
      heading: "1. Cómo usar esto",
      paragraphs: [
        "Este plan es para ti, Ricardo. Vendes para Spring Landscape y Winter Bright, en inglés, a clientes que hablan inglés. No necesitas un estudio. Necesitas tu teléfono, un lugar tranquilo y **15–20 minutos al día**."
      ],
      routineLead: "Tu rutina diaria (15–20 min):",
      routine: [
        "**10 minutos:** el ejercicio diario de articulación. El mismo todos los días. La repetición es lo que cambia los hábitos de la boca.",
        "**5–10 minutos:** una lección de carisma. Lee la idea clave, di el guion en voz alta y haz el ejercicio de 5 minutos."
      ],
      planLead: "El plan de 4 semanas:",
      rulesLead: "Reglas simples:",
      rules: [
        "**Di todo en voz alta.** Leer en silencio no entrena la boca.",
        "**Graba seguido.** Tu teléfono es tu coach. Vas a oír cosas que no notas mientras hablas.",
        "**El español es una fortaleza, no un problema.** La meta no es quitarte el acento. La meta es hablar **claro, con calma y fácil de seguir**. El cliente confía en un vendedor que suena seguro, acento incluido.",
        "**Las frases se quedan en inglés.** Los guiones, los trabalenguas y el apuntador se quedan en inglés, porque ese es el idioma de la venta. English traduce la explicación, no las palabras que le dices al cliente.",
        "**Los avances chicos cuentan.** Si faltas un día, retomas al siguiente. No vuelvas a empezar de cero.",
        "**Llena la autoevaluación semanal** cada domingo."
      ]
    },
    weeks: [
      {
        week: 1,
        focus: "Sonidos claros y una primera impresión fuerte",
        lessonsLabel: "1, 2, 3",
        lessonIds: [1, 2, 3],
        extra: "Grábate leyendo el guion de 60 segundos una vez (punto de partida)"
      },
      {
        week: 2,
        focus: "Presencia e historias",
        lessonsLabel: "4, 5, 6",
        lessonIds: [4, 5, 6],
        extra: "Practica el guion de 60 segundos 3 veces esta semana"
      },
      {
        week: 3,
        focus: "Leer al cliente y conversaciones difíciles",
        lessonsLabel: "7, 8, 9",
        lessonIds: [7, 8, 9],
        extra: "Usa una técnica en una llamada o visita real cada día"
      },
      {
        week: 4,
        focus: "Límites y el cierre",
        lessonsLabel: "10, 11, repaso general",
        lessonIds: [10, 11],
        extra: "Graba tu guion final de 60 segundos"
      }
    ],
    drill: {
      heading: "2. Ejercicio diario de articulación, 10 minutos",
      intro: "Hazlos en orden. Usa el temporizador.",
      steps: [
        {
          id: "warmup",
          title: "Paso 1 — Calentamiento",
          shortTitle: "Calentamiento",
          minutesLabel: "2 minutos",
          seconds: 120,
          parts: [
            {
              label: "Respiración de abdomen",
              seconds: 30,
              text: "Mano en el estómago. Inhala por la nariz en 4 tiempos: el estómago sale, los hombros no. Exhala lento en 6 tiempos. Repite 3 veces."
            },
            {
              label: "Vibración de labios",
              seconds: 30,
              text: "Sopla aire con los labios cerrados y relajados para que vibren como un motor (\"brrrrr\"). Desliza la voz de grave a agudo y de regreso."
            },
            {
              label: "Soltar la quijada",
              seconds: 30,
              text: "Abre la boca grande, como un bostezo, sostén 2 segundos y cierra. Luego mueve la quijada suave de lado a lado. Masajea los músculos delante de las orejas."
            },
            {
              label: "Estirar la lengua",
              seconds: 30,
              text: "Saca la lengua hacia afuera y abajo, y sostén. Luego toca el paladar detrás de los dientes de arriba. Después recorre por dentro de los labios 5 veces para cada lado."
            }
          ]
        },
        {
          id: "overart",
          title: "Paso 2 — Lectura con boca exagerada",
          shortTitle: "Boca exagerada",
          minutesLabel: "2 minutos",
          seconds: 120,
          paragraphs: [
            "Lee el párrafo de abajo **lento y con la boca exagerada**, como si le hablaras a alguien al otro lado de un patio ruidoso que te lee los labios. Abre la boca más de lo normal. Marca el último sonido de cada palabra."
          ],
          quoteNote: "Este párrafo es una llamada de ventas. Léelo en inglés.",
          after: "Luego léelo otra vez a **velocidad normal**, con los mismos finales limpios. La segunda lectura suena más nítida."
        },
        {
          id: "twisters",
          title: "Paso 3 — Trabalenguas para sonidos del inglés",
          shortTitle: "Trabalenguas",
          minutesLabel: "3 minutos",
          seconds: 180,
          intro: "Elige **3 o 4 grupos por día** y rota. Di cada línea 3 veces: lento, medio y natural. Primero la precisión, después la velocidad. Las líneas se quedan en inglés.",
          sets: [
            {
              title: "TH (la \"th\" suave de ~think~ y la \"th\" sonora de ~this~)",
              how: "Pon la punta de la lengua, suave, **entre los dientes** y sopla. No es \"t\" ni \"d\", ni \"s\" ni \"z\"."
            },
            {
              title: "V y B",
              how: "**V** = los dientes de arriba tocan suave el labio de abajo y el sonido vibra. **B** = los dos labios se juntan y sueltan."
            },
            {
              title: "I corta (~sit~) y EE larga (~seat~)",
              how: "La **i** corta es relajada y breve, con la boca apenas abierta. La **ee** larga es una sonrisa amplia y un sonido más largo.",
              lineLabels: ["Pares:", ""]
            },
            {
              title: "Consonantes finales (no te comas el último sonido)",
              how: "Termina cada palabra. El último sonido es corto pero **claro**: t, d, k, p, s, st."
            },
            {
              title: "Terminaciones -ED (tres sonidos: t / d / id)",
              howParagraphs: [
                "Después de sonidos como p, k, s, sh, ch, f → **\"t\"**: ~raked~ = \"raykt\", ~fixed~ = \"fikst\", ~washed~ = \"washt\".",
                "Después de sonidos sonoros (b, g, v, z, m, n, l, r, vocales) → **\"d\"**: ~trimmed~ = \"trimd\", ~cleaned~ = \"kleend\", ~called~ = \"kawld\".",
                "Después de t o d → **\"id\"** (sílaba extra): ~planted~ = \"plan-tid\", ~needed~ = \"nee-did\", ~started~ = \"star-tid\"."
              ]
            },
            {
              title: "SH y CH",
              how: "**SH** es aire continuo y suave (\"shhh\", como pedir silencio). **CH** empieza con un pequeño corte (\"t\" + \"sh\")."
            },
            {
              title: "Z (la \"z\" que vibra)",
              how: "La boca es la de la \"s\", pero enciende la voz: tienes que sentir vibración en la garganta. Muchas palabras escritas con \"s\" suenan \"z\": ~is, was, has, trees, homes, shrubs~.",
              lineNotes: ["", "(todos sonidos **z**)"],
              businessNote: "(plans suena \"planz\", homes suena \"homz\", trees suena \"treez\", shrubs suena \"shrubz\")"
            }
          ]
        },
        {
          id: "pace",
          title: "Paso 4 — Control del ritmo",
          shortTitle: "Ritmo",
          minutesLabel: "1.5 minutos",
          seconds: 90,
          paragraphs: [
            "**Ritmo meta: unas 140 a 160 palabras por minuto.** Así suenas calmado, claro y fácil de seguir.",
            "**Cómo medirlo:** Lee el guion de 60 segundos en voz alta con el temporizador. Cuenta las palabras que terminaste en un minuto. ¿Muy rápido? Agrega pausas. ¿Muy lento? Acorta las pausas. No aceleres las palabras.",
            "**Consejo:** Cuando estás nervioso, te aceleras. Baja la velocidad **a propósito** en el precio y en lo que necesitas que recuerden."
          ]
        },
        {
          id: "fillers",
          title: "Paso 5 — Pausa en vez de muletillas",
          shortTitle: "Pausas",
          minutesLabel: "1 minuto",
          seconds: 60,
          paragraphs: [
            "Las muletillas — \"um\", \"eh\", \"like\", \"you know\", \"o sea\", \"este\" — te hacen sonar inseguro. Una **pausa en silencio** te hace sonar pensativo y en control.",
            "**Ejercicio:** Habla 60 segundos sobre qué incluye una visita de mantenimiento. Cada vez que sientas una muletilla, **cierra la boca y pausa** un segundo.",
            "**Regla:** Pausa **antes** de un punto clave y **después** del precio. El silencio no es incómodo. Es parte del cierre."
          ]
        },
        {
          id: "record",
          title: "Paso 6 — Grabar y repasar",
          shortTitle: "Grabar y repasar",
          minutesLabel: "30 segundos para grabar, repasar después",
          seconds: 30,
          paragraphs: [
            "Graba un clip de 30 segundos al día (una frase de ventas, el párrafo de la llamada o una parte del guion). Escúchalo una vez y revisa:"
          ],
          checks: [
            "¿Una persona nueva entendería cada palabra?",
            "¿Terminé los finales (t, d, s, -ed)?",
            "¿Llegué a los sonidos meta (th, v, z, i corta)?",
            "¿El ritmo estuvo calmado, sin apuro?",
            "¿Cuántas muletillas? (Meta: menos cada semana.)",
            "¿La voz **bajó** al final de las frases (seguridad) en vez de **subir** (suena a pregunta)?",
            "¿Soné cálido, como alguien a quien el cliente le diría que sí?"
          ]
        }
      ]
    },
    lessonsIntro: {
      heading: "3. Once lecciones de carisma (\"Desbloquea tu carisma\")",
      text: "Haz una lección por día de práctica. Cada lección tiene una idea clave, técnicas, un guion en inglés de una situación de ventas y un ejercicio de 5 minutos."
    },
    lessons: [
      {
        id: 1,
        title: "Primeras impresiones",
        keyIdea: "La gente decide rápido si le caes bien y si confía en ti, casi siempre antes de hablar de precio. Los primeros segundos — la cara, el saludo, la voz, la primera frase — marcan toda la visita. El primer momento es sobre **ellos**, no sobre el discurso.",
        techniques: [
          "**Llega prendido:** Antes de bajar de la camioneta, toma una respiración lenta, suelta los hombros y sonríe. Empieza la visita ya en calma.",
          "**Nombre, sonrisa y mirada:** Usa el nombre del cliente en la primera frase. Míralo a los ojos un segundo completo.",
          "**Abre con una pregunta sobre ellos,** no con un discurso sobre ti.",
          "**Usa una voz cálida y un poco más grave.** Ni fuerte ni apurada."
        ],
        scriptTitle: "Guion de práctica — abrir una cotización o una visita:",
        purpose: "Para abrir una cotización o una visita a la propiedad. El guion se queda en inglés.",
        exercise: "Párate frente a un espejo o apoya el teléfono. Di la apertura 5 veces. Cada vez cambia una cosa: sonrisa más grande, primera frase más lenta, mirada más firme, voz más grave, pausa más larga después del nombre. Quédate con la versión que te dé confianza y úsala en la próxima visita real."
      },
      {
        id: 2,
        title: "Confianza en la voz",
        keyIdea: "En una llamada, el cliente te juzga por cómo suenas. Una voz firme, cálida y con finales claros suena de fiar. Una voz rápida, que sube o que se queda delgada, suena insegura. Tu voz tiene que decir: conozco este trabajo y me importa.",
        techniques: [
          "**Finales hacia abajo:** Termina las frases con la voz **bajando**. Si sube, un dato suena a pregunta.",
          "**Baja la velocidad en el punto de la llamada:** por qué llamas y cuál es el siguiente paso.",
          "**Habla desde el abdomen:** usa la respiración del calentamiento para que la voz sea llena, no delgada.",
          "**Calidez:** una sonrisa leve mientras hablas. Se oye, incluso por teléfono."
        ],
        scriptTitle: "Guion de práctica — llamar a un cliente nuevo:",
        purpose: "Para llamar a un cliente nuevo. El guion se queda en inglés.",
        script2Title: "Guion de práctica — dejar un mensaje de voz:",
        script2Purpose: "Para un mensaje de voz si no contestan. El guion se queda en inglés. No dejes un teléfono en el mensaje.",
        exercise: "Graba el guion de la llamada dos veces: una con la voz subiendo al final de cada frase y otra bajando. Escucha. Quédate con la que tú confiarías. Después graba el mensaje de voz una vez, en menos de 30 segundos, y revisa que no te apures en los nombres de las empresas."
      },
      {
        id: 3,
        title: "Di el precio y calla",
        keyIdea: "La confianza no es esperar que digan que sí. Es estar en calma con el valor. Cuando dices un precio, te miran la cara y te escuchan la voz. Si te encoges, te disculpas o te apuras, el precio suena blando. Dílo una vez, claro, y **deja de hablar**.",
        techniques: [
          "**Afirma, no pidas permiso:** \"Your price is…\" — no \"Would it be okay if…\".",
          "**Sin palabras de disculpa:** quita \"just\", \"only\", \"sorry, but\", \"I know it's a lot\".",
          "**Precio y después tres segundos de silencio.** Cuenta hasta tres en tu cabeza. No lo rellenes.",
          "**Cuerpo quieto:** pies firmes, hombros atrás, manos quietas."
        ],
        scriptTitle: "Guion de práctica — decir el precio y callar:",
        purpose: "Para decir el precio y callar tres segundos. El guion se queda en inglés. [price] es un marcador, no un precio real.",
        note: "Cuando practiques en voz alta, di el precio real. No escribas el número en esta aplicación. Dílo calmado y parejo, y después sostén el silencio.",
        exercise: "Elige 5 precios que cotizas seguido. Di cada uno en voz alta 5 veces y, después de cada uno, quédate en silencio 3 segundos. Graba una ronda. Escucha si apuraste el número, si la voz subió o si llenaste el silencio. No anotes los números aquí."
      },
      {
        id: 4,
        title: "Presenta los paquetes",
        keyIdea: "Una casa es un cuarto pequeño. Apréndete la primera frase y la última, baja la velocidad y habla con una persona a la vez hasta terminar la idea. Con tres opciones basta. Los nervios son normales: úsalos como energía, no como prisa.",
        techniques: [
          "**Memoriza la primera y la última frase.** El medio puede ser notas.",
          "**Una persona, una idea:** mira a una persona hasta terminar la frase y luego pasa a la otra.",
          "**Regla de tres:** plan más ligero, plan más completo, mantenimiento más luces de temporada.",
          "**Respira antes de empezar:** 4 al inhalar, 6 al exhalar, y luego hablas."
        ],
        scriptTitle: "Guion de práctica — presentar paquetes de mantenimiento:",
        purpose: "Para presentar los paquetes de mantenimiento. El guion se queda en inglés.",
        exercise: "Ponte de pie. Coloca tres objetos en el cuarto. Esas son las personas que escuchan. Di el guion de los paquetes mirando un objeto distinto en cada opción. Hazlo 3 veces. En la última, agrega una frase tuya sin inventar un cuarto paquete."
      },
      {
        id: 5,
        title: "Cuenta una historia",
        keyIdea: "La gente olvida la lista de tareas y recuerda una historia. Una historia simple tiene un antes, un problema, lo que hiciste y el después. Un detalle la hace real. La historia le deja ver al cliente su propia casa.",
        techniques: [
          "**Antes, problema, acción, después.** De 4 a 6 frases.",
          "**Un detalle concreto:** una entrada, un seto, un cantero.",
          "**Muestra cómo se sentían** antes y después.",
          "**Cierra en ellos:** qué significa para este cliente."
        ],
        scriptTitle: "Guion de práctica — una historia en la visita:",
        purpose: "Para contar una historia en la visita. El guion se queda en inglés. Mrs. Bennett es un nombre inventado.",
        note: "Mrs. Bennett no es una clienta real. Puedes cambiarla por una historia de tu trabajo. El nombre de esa persona se queda en privado.",
        exercise: "Escribe una historia de tu trabajo en 4 a 6 líneas cortas: antes, problema, acción, después. Cuéntala en voz alta 3 veces sin leer. Graba la última. Revisa: un detalle claro y menos de un minuto."
      },
      {
        id: 6,
        title: "Lenguaje corporal",
        keyIdea: "El cuerpo habla antes que la boca. Una postura abierta, relajada y firme dice que se puede confiar en ti. Los brazos cruzados, la mirada baja o las manos inquietas le pueden ganar a una buena frase.",
        techniques: [
          "**Postura abierta:** brazos sin cruzar, manos a la vista, pecho abierto.",
          "**Párate de lado,** junto al cliente, mientras miran el jardín juntos. Se siente como un acuerdo, no como un discurso.",
          "**Señala con la mano abierta,** no con un dedo.",
          "**Manos quietas cuando hablas del precio.** Moverlas suena a duda.",
          "**Asiente lento** cuando ellos hablan. Muestra que estás escuchando."
        ],
        scriptTitle: "Guion de práctica — caminar la propiedad lado a lado:",
        purpose: "Para caminar la propiedad lado a lado. El guion se queda en inglés.",
        exercise: "Apoya el teléfono y grábate haciendo el guion mientras caminas por un cuarto. Míralo sin sonido. Pregúntate: ¿me veo calmado? ¿Las manos están abiertas? ¿Un cliente confiaría en esta persona? Corrige una cosa y graba otra vez."
      },
      {
        id: 7,
        title: "Lee al cliente",
        keyIdea: "Un buen vendedor escucha con los ojos y con los oídos. Fíjate si el cliente va apurado, preocupado, enfocado en el precio o en los detalles, y ajusta cómo hablas. No es adivinar. Es prestar atención y preguntar.",
        techniques: [
          "**Mira las señales:** el teléfono o la puerta = va apurado, sé breve. Muchas preguntas = quiere detalle. Brazos cruzados y \"how much?\" temprano = primero el precio, luego el valor.",
          "**Acompaña su ritmo:** si habla rápido, ve un poco más directo. Si habla lento, bájale.",
          "**Pregunta, no supongas:** \"Do you want the short version or the full walk-through?\"",
          "**Escucha la preocupación real** detrás de la pregunta."
        ],
        scriptTitle: "Guion de práctica — ver qué quiere el cliente:",
        purpose: "Para leer lo que el cliente quiere en una llamada o una visita. El guion se queda en inglés.",
        exercise: "Piensa en tus últimas 3 conversaciones con clientes. Para cada una, escribe una línea: qué parecían sentir, qué les importaba y qué dirías distinto ahora. Después di el guion dos veces: una rápida y corta, y otra lenta y con detalle."
      },
      {
        id: 8,
        title: "Da seguimiento claro",
        keyIdea: "Un estimado en silencio no necesita un discurso largo. Un buen seguimiento es pronto, concreto y respetuoso. Habla de la decisión, no de acorralar a la persona. Da un siguiente paso claro y para.",
        techniques: [
          "**Pronto y directo.** No dejes el estimado en silencio.",
          "**Hecho, por qué importa, siguiente paso.** Qué enviaste, por qué un número claro ayuda y qué pregunta necesitas cerrar.",
          "**Corto:** menos de un minuto.",
          "**Un sí o un no, los dos sirven.** Dílo y hazlo de verdad. La presión no es claridad."
        ],
        scriptTitle: "Guion de práctica — seguimiento de un cliente:",
        purpose: "Para el seguimiento después de una visita o de un estimado enviado. El guion se queda en inglés.",
        exercise: "Elige un estimado real que siga abierto. Escribe un seguimiento de 3 o 4 frases: hecho, por qué importa, siguiente paso. Dílo en voz alta 3 veces, en menos de 45 segundos, con voz calmada. Graba la última toma."
      },
      {
        id: 9,
        title: "Cuando dicen que está muy caro",
        keyIdea: "Quien dice que el precio está alto quiere sentirse escuchado antes de oír una salida. Si discutes, empuja más. Quédate calmado, baja la velocidad, repite la preocupación y luego pasa al alcance y a una opción clara.",
        techniques: [
          "**Más bajo y más lento:** si ellos suben el volumen, tú te calmas.",
          "**Nómbralo:** \"I hear you. It feels high.\"",
          "**Hechos, no un debate:** el precio corresponde al alcance que recorrieron.",
          "**Ofrece un alcance más chico,** nunca un precio más bajo por el mismo trabajo.",
          "**No te lo tomes personal.** Es la decisión, no un juicio sobre ti."
        ],
        scriptTitle: "Guion de práctica — cuando dicen que está muy caro:",
        purpose: "Para cuando dicen que está muy caro. El guion se queda en inglés.",
        exercise: "Pide que alguien haga de cliente molesto, o grábate tú en los dos papeles. Pasa el guion dos veces. Tus únicas metas: voz baja y lenta, no interrumpir, y terminar ofreciendo un alcance más chico, no un descuento."
      },
      {
        id: 10,
        title: "Di que no al descuento",
        keyIdea: "Decir que no protege el precio y la calidad del trabajo. Un buen no es corto, amable y ofrece una opción real. Las excusas largas suenan a culpa e invitan a regatear. Puedes ser cálido y firme al mismo tiempo.",
        techniques: [
          "**Gracias, no, un porqué corto, una opción.**",
          "**No expliques de más.** Las razones extra suenan a que vas a ceder.",
          "**Ofrece otro alcance,** nunca un precio más bajo por el mismo trabajo.",
          "**La misma voz calmada** con la que dices un precio."
        ],
        scriptTitle: "Guion de práctica — decir que no a un descuento:",
        purpose: "Para cuando piden un descuento. El guion se queda en inglés.",
        exercise: "Escribe 3 cosas que te piden y a las que quieres decir que no: un descuento, un extra gratis, una promesa que no puedes cumplir. Para cada una, escribe gracias, no, porqué y opción en 3 frases. Di cada una en voz alta 3 veces. Graba la más difícil."
      },
      {
        id: 11,
        title: "Pide el sí",
        keyIdea: "Una conversación larga igual necesita una decisión. Interrumpir con educación es la forma de llegar: usa el nombre, muestra que escuchaste y pide el sí. Eso los respeta a los dos.",
        techniques: [
          "**Usa el nombre.** Llama la atención sin un tono duro.",
          "**Puente:** \"Let me jump in for one second\" o \"That is helpful, so…\".",
          "**Resume en una frase** para que se sientan escuchados.",
          "**Pide el sí.** Una visita sin pregunta es un recorrido, no un cierre."
        ],
        scriptTitle: "Guion de práctica — cerrar pidiendo el sí:",
        purpose: "Para cerrar pidiendo el sí. El guion se queda en inglés.",
        exercise: "Pon dos minutos de alguien hablando. Pausa en momentos al azar y practica en voz alta: nombre, puente, resumen de una frase y luego la pregunta. Hazlo 5 veces. Termina cada ronda con la pregunta y después silencio."
      }
    ],
    pitch: {
      heading: "4. Guion de 60 segundos",
      intro: "Este es el guion del apuntador para Spring Landscape y Winter Bright. Se practica en inglés.",
      purpose: "Un guion de 60 segundos para una llamada, una puerta o una cámara. Las palabras se quedan en inglés.",
      timing: "Unas 100 palabras. Con las pausas, a un ritmo calmado, dura cerca de 60 segundos.",
      note: "Antes de grabar, revisa que cada línea coincida con lo que sí ofreces. No prometas cuánto dura una visita, cuántas personas van ni un día fijo. Cuando practiques en voz alta, di el precio real. No escribas ese número en esta aplicación. [price] es solo un marcador.",
      rehearsal: {
        heading: "Rutina de ensayo",
        beforeLead: "Días antes de grabar (semana 4):",
        before: [
          "**Léelo 3 veces en voz alta** con las pausas y los énfasis. No te preocupes por memorizarlo.",
          "**Marca las palabras difíciles** — las más probables: ~Auburn, shrubs, lighting, maintenance, package, property, price, trust~. Di cada una lento, 5 veces.",
          "**Apréndete la primera y la última línea de memoria.** El medio puede quedarse en el teléfono, justo debajo de la cámara."
        ],
        dayLead: "El día de la grabación:",
        day: [
          "**Calienta** (paso 1 del ejercicio diario — 2 minutos).",
          "**Arma el lugar:** cámara a la altura de los ojos, luz en la cara, lugar tranquilo.",
          "**Graba 3 tomas:**",
          "**Toma 1 — Natural:** solo termínalo.",
          "**Toma 2 — Más lenta:** un poco más de pausa en cada //.",
          "**Toma 3 — La más cálida:** sonríe mientras lo dices, como si hablaras con un vecino."
        ],
        reviewLead: "Revisa cada toma con esta lista:",
        review: [
          "El guion dura cerca de 60 segundos",
          "Cada palabra se entiende — sobre todo ~Auburn, shrubs, lighting, price, trust~",
          "Los sonidos finales están limpios",
          "No hay muletillas",
          "La voz **baja** al final de las frases",
          "Los ojos en la cámara o en la persona, no en la pantalla",
          "Hombros sueltos, cara amable",
          "El final se siente cálido, no apurado"
        ],
        close: "**Elige la mejor toma.** Si ninguna sirve, descansa 10 minutos y graba 3 más. Casi siempre una toma posterior es la buena."
      }
    },
    mainScript: {
      heading: "Guion principal de ventas",
      purpose: "Una llamada real para usar junto al guion corto: seguimiento, recorrer la propiedad, nombrar el paquete, decir el precio y pedir el sí. Se dice en inglés.",
      note: "[price] es un marcador. Di el número real en voz alta. No lo guardes aquí."
    },
    voicemail: {
      heading: "Mensaje de voz",
      purpose: "El mismo mensaje de voz de la lección 2, aquí para practicarlo junto al guion. Se dice en inglés.",
      note: "No dejes un teléfono, un correo ni una dirección en el mensaje."
    },
    score: {
      heading: "5. Autoevaluación semanal",
      intro: "Cada domingo, califícate del **1 al 5** (1 = le falta mucho, 5 = fuerte). Sé honesto. Esto es solo para ti. Escucha una grabación de la semana antes de calificar.",
      scale: "1 = le falta mucho, 5 = fuerte. El total es sobre 75.",
      skills: [
        "Hice el ejercicio diario (días de 7)",
        "Sonidos TH claros",
        "V y B claras",
        "I corta y EE larga",
        "Consonantes finales y terminaciones -ed",
        "Sonidos SH, CH y Z",
        "Ritmo (calmado, unas 140–160 palabras por minuto)",
        "Pausas en vez de muletillas",
        "Voz segura (las frases bajan al final)",
        "Primera impresión en llamadas y visitas",
        "Decir el precio y callar tres segundos",
        "Lenguaje corporal (manos abiertas y tranquilas)",
        "Manejar «está muy caro» y pedidos de descuento",
        "Pedir el sí",
        "El guion de 60 segundos"
      ],
      winLabel: "Una victoria de esta semana:",
      nextLabel: "Una cosa para enfocar la próxima semana:",
      close: "Sigue. Claro, calmado y cálido le gana a perfecto, siempre."
    }
  };

  function buildSpeechContent(lang) {
    var pack = JSON.parse(JSON.stringify(lang === "en" ? EN : ES));
    var i;
    pack.version = "1.0.0";
    pack.rotation = JSON.parse(JSON.stringify(ROTATION));
    pack.drill.steps[1].quote = OVERART;
    for (i = 0; i < TWISTERS.length; i++) {
      pack.drill.steps[2].sets[i].lines = TWISTERS[i].lines.slice();
      if (TWISTERS[i].business) pack.drill.steps[2].sets[i].business = TWISTERS[i].business;
    }
    for (i = 0; i < LESSON_SCRIPTS.length; i++) {
      pack.lessons[i].id = i + 1;
      pack.lessons[i].script = LESSON_SCRIPTS[i].script;
      if (LESSON_SCRIPTS[i].script2) pack.lessons[i].script2 = LESSON_SCRIPTS[i].script2;
    }
    pack.pitch.lines = PITCH.slice();
    pack.mainScript.lines = MAIN.slice();
    pack.voicemail.lines = [VOICEMAIL];
    return pack;
  }

  window.buildSpeechContent = buildSpeechContent;
})();
