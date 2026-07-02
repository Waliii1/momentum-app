const todayKey = () => new Date().toISOString().slice(0, 10);

const MINIMUM_XP = 20;
const IDEAL_XP = MINIMUM_XP * 2;
const ALL_MINIMUMS_BONUS = 60;
const ALL_IDEALS_BONUS = 120;
const LEVEL_BASE_COST = 100;
const LEVEL_GROWTH = 1.13;

const habits = [
  {
    id: "religion",
    name: "Religion",
    icon: "☾",
    minimum: ["🌅 Fajr", "☀️ Dhuhr", "🌤️ Asr", "🌙 Maghrib", "🌌 Isha", "📖 Quran: 1 page", "✨ Tasbee7"],
    ideal: ["📖 5-10+ Quran pages", "🤲 Pray with calm focus", "✨ Extra dhikr"],
  },
  {
    id: "twix",
    name: "Twix",
    icon: "🐾",
    minimum: ["🚶 Walk Twix", "🎯 Train Twix"],
    ideal: ["🫧 Shower Twix"],
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: "↟",
    minimum: ["Touch equipment", "5 pushups", "1 pull movement", "Stretch briefly"],
    ideal: ["Full workout", "Progressive overload", "Cardio"],
  },
  {
    id: "coding",
    name: "Coding",
    icon: "⌘",
    minimum: ["Open coding environment", "Code for 5 minutes"],
    ideal: ["1-3 focused hours"],
  },
  {
    id: "math",
    name: "Math",
    icon: "∑",
    minimum: ["Study for 5 minutes"],
    ideal: ["Deep focused session", "Solve hard problems"],
  },
  {
    id: "reading",
    name: "Reading",
    icon: "◈",
    minimum: ["Read 1 page"],
    ideal: ["Read 20-40 pages", "Capture one useful idea"],
  },
];

const quotes = [
  "Minimum counts. Starting counts. Today only needs proof that you execute.",
  "You are not chasing a perfect day. You are casting one vote for your identity.",
  "Tiny execution beats heroic planning.",
  "Recovery is part of the game. No reset button required.",
  "Five minutes is enough to keep the chain alive.",
];

const achievements = [
  {
    id: "first-minimum",
    icon: "✦",
    title: "First Step",
    description: "Finish any minimum habit.",
    reward: 25,
    test: (stats) => stats.minimumHabits >= 1,
  },
  {
    id: "three-minimums",
    icon: "▲",
    title: "Warm Start",
    description: "Finish 3 minimum habits.",
    reward: 40,
    test: (stats) => stats.minimumHabits >= 3,
  },
  {
    id: "all-minimums",
    icon: "◆",
    title: "Minimum Day",
    description: "Clear all minimum habits in one day.",
    reward: 80,
    test: (stats) => stats.perfectDays >= 1,
  },
  {
    id: "first-ideal",
    icon: "◇",
    title: "Bonus Level",
    description: "Finish any ideal habit.",
    reward: 60,
    test: (stats) => stats.idealHabits >= 1,
  },
  {
    id: "all-ideals",
    icon: "◈",
    title: "Complete Clear",
    description: "Clear every ideal habit in one day.",
    reward: 180,
    test: (stats) => stats.idealDays >= 1,
  },
  {
    id: "two-perfect-days",
    icon: "Ⅱ",
    title: "Repeat Proof",
    description: "Complete 2 perfect minimum days.",
    reward: 120,
    test: (stats) => stats.perfectDays >= 2,
  },
  {
    id: "three-streak",
    icon: "🔥",
    title: "Spark",
    description: "Reach a 3-day perfect streak.",
    reward: 150,
    test: (stats) => stats.bestStreak >= 3,
  },
  {
    id: "seven-streak",
    icon: "⚔",
    title: "Week Warrior",
    description: "Reach a 7-day perfect streak.",
    reward: 350,
    test: (stats) => stats.bestStreak >= 7,
  },
  {
    id: "fourteen-streak",
    icon: "◉",
    title: "Two-Week Lock",
    description: "Reach a 14-day perfect streak.",
    reward: 800,
    test: (stats) => stats.bestStreak >= 14,
  },
  {
    id: "thirty-streak",
    icon: "♛",
    title: "Thirty-Day Legend",
    description: "Reach a 30-day perfect streak.",
    reward: 2000,
    test: (stats) => stats.bestStreak >= 30,
  },
  {
    id: "religion-five",
    icon: "☾",
    title: "Faith Anchor",
    description: "Complete Religion minimum 5 times.",
    reward: 220,
    test: (stats) => stats.habitMinimums.religion >= 5,
  },
  {
    id: "twix-five",
    icon: "🐾",
    title: "Good Companion",
    description: "Complete Twix minimum 5 times.",
    reward: 220,
    test: (stats) => stats.habitMinimums.twix >= 5,
  },
  {
    id: "fitness-five",
    icon: "↟",
    title: "Body Online",
    description: "Complete Fitness minimum 5 times.",
    reward: 220,
    test: (stats) => stats.habitMinimums.fitness >= 5,
  },
  {
    id: "coding-five",
    icon: "⌘",
    title: "Code Opens",
    description: "Complete Coding minimum 5 times.",
    reward: 220,
    test: (stats) => stats.habitMinimums.coding >= 5,
  },
  {
    id: "math-five",
    icon: "∑",
    title: "Math Returns",
    description: "Complete Math minimum 5 times.",
    reward: 220,
    test: (stats) => stats.habitMinimums.math >= 5,
  },
  {
    id: "reading-five",
    icon: "◈",
    title: "Pages Become Proof",
    description: "Complete Reading minimum 5 times.",
    reward: 220,
    test: (stats) => stats.habitMinimums.reading >= 5,
  },
  {
    id: "fifty-minimums",
    icon: "50",
    title: "Fifty Executions",
    description: "Complete 50 minimum habits total.",
    reward: 500,
    test: (stats) => stats.minimumHabits >= 50,
  },
  {
    id: "hundred-minimums",
    icon: "100",
    title: "Hundred Votes",
    description: "Complete 100 minimum habits total.",
    reward: 1200,
    test: (stats) => stats.minimumHabits >= 100,
  },
  {
    id: "twenty-ideals",
    icon: "★",
    title: "Beyond Minimum",
    description: "Complete 20 ideal habits total.",
    reward: 650,
    test: (stats) => stats.idealHabits >= 20,
  },
  {
    id: "ten-active-days",
    icon: "▣",
    title: "Ten Days Present",
    description: "Log progress on 10 different days.",
    reward: 400,
    test: (stats) => stats.activeDays >= 10,
  },
  {
    id: "level-five",
    icon: "V",
    title: "Level Five",
    description: "Reach Level 5.",
    reward: 500,
    test: (stats) => stats.level >= 5,
  },
  {
    id: "level-ten",
    icon: "X",
    title: "Level Ten",
    description: "Reach Level 10.",
    reward: 1200,
    test: (stats) => stats.level >= 10,
  },
  {
    id: "ten-thousand",
    icon: "◇",
    title: "Momentum Engine",
    description: "Earn 10,000 Momentum.",
    reward: 2500,
    test: (stats) => stats.baseMomentum >= 10000,
  },
];

const shopRewards = [
  {
    id: "premium-coffee",
    title: "☕ Premium Coffee",
    description: "Buy your favorite coffee or drink.",
    why: "Immediate positive reinforcement tied to consistency.",
    rules: "Maximum twice per week.",
    cost: 75,
    category: "Experiences",
    tier: "Small",
    repeatable: true,
    cooldown: { limit: 2, days: 7 },
    status: "active",
  },
  {
    id: "favorite-snack",
    title: "🍫 Favorite Snack",
    description: "Buy one snack you have been craving.",
    why: "A small, tangible reward that feels earned.",
    rules: "Not immediately before bed.",
    cost: 125,
    category: "Experiences",
    tier: "Small",
    repeatable: true,
    cooldown: { limit: 1, days: 1 },
    status: "active",
  },
  {
    id: "buy-book",
    title: "📚 Buy a Book",
    description: "Buy a physical or digital book you have wanted.",
    why: "Reinforces your identity as someone who is constantly learning.",
    rules: "Choose the book before redeeming.",
    cost: 500,
    category: "Learning",
    tier: "Medium",
    repeatable: true,
    cooldown: { limit: 1, days: 14 },
    status: "active",
  },
  {
    id: "digital-tool",
    title: "🎧 App, Album, or Digital Tool",
    description: "Purchase a digital item, app, or piece of media you have been wanting.",
    why: "Makes digital purchases feel earned instead of impulsive.",
    rules: "No impulse purchase. It must be chosen before redeeming.",
    cost: 650,
    category: "Learning",
    tier: "Medium",
    repeatable: true,
    cooldown: { limit: 1, days: 14 },
    status: "active",
  },
  {
    id: "half-day-adventure",
    title: "🌅 Half-Day Adventure",
    description: "Spend a few hours at a cafe, beach, park, museum, or enjoyable outing.",
    why: "Rewards memorable experiences instead of more screen time.",
    rules: "Plan the place before redeeming.",
    cost: 750,
    category: "Experiences",
    tier: "Medium",
    repeatable: true,
    cooldown: { limit: 1, days: 21 },
    status: "active",
  },
  {
    id: "setup-upgrade",
    title: "🖥️ Upgrade Your Setup",
    description: "Buy a useful workspace accessory like a keyboard, mouse, desk mat, light, or stand.",
    why: "Improves the environment that supports your habits.",
    rules: "Must be useful, not clutter.",
    cost: 1800,
    category: "Upgrades",
    tier: "Major",
    repeatable: true,
    cooldown: { limit: 1, days: 30 },
    status: "active",
  },
  {
    id: "full-rest-day",
    title: "📅 Full Rest Day",
    description: "Skip all ideal habits for one day while still completing every minimum.",
    why: "Prevents burnout without sacrificing consistency.",
    rules: "Minimums remain mandatory.",
    cost: 2500,
    category: "Experiences",
    tier: "Major",
    repeatable: true,
    cooldown: { limit: 1, days: 30 },
    status: "active",
  },
  {
    id: "custom-badge",
    title: "🏅 Custom Badge",
    description: "Unlock a permanent cosmetic badge displayed on your profile.",
    why: "A visible symbol of long-term consistency that cannot be lost.",
    rules: "One-time identity reward.",
    cost: 1000,
    category: "Identity",
    tier: "Identity",
    repeatable: false,
    status: "active",
  },
];

const defaultState = {
  name: "Walid",
  momentum: 0,
  allTimeMomentum: 0,
  spentMomentum: 0,
  purchases: [],
  completions: {},
  reflections: {},
};

let state = loadState();
let activeTab = "home";
syncMomentum();

function loadState() {
  const saved = localStorage.getItem("momentum-state");
  return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
}

function saveState() {
  syncMomentum();
  localStorage.setItem("momentum-state", JSON.stringify(state));
}

function syncMomentum() {
  const earned = calculateMomentum();
  state.spentMomentum = Math.min(state.spentMomentum || 0, earned);
  state.allTimeMomentum = earned;
  state.momentum = Math.max(0, earned - state.spentMomentum);
  state.purchases = state.purchases || [];
}

function getHabit(habitId) {
  return habits.find((habit) => habit.id === habitId);
}

function recordFor(habitId, date = todayKey()) {
  const value = state.completions[date]?.[habitId];

  if (value === true) {
    const habit = getHabit(habitId);
    return {
      minimum: Object.fromEntries(habit.minimum.map((_, index) => [index, true])),
      ideal: {},
      minRewarded: true,
      idealRewarded: false,
    };
  }

  return value || { minimum: {}, ideal: {}, minRewarded: false, idealRewarded: false };
}

function isStepDone(habitId, type, index, date = todayKey()) {
  return Boolean(recordFor(habitId, date)[type]?.[index]);
}

function isMinimumComplete(habitId, date = todayKey()) {
  const habit = getHabit(habitId);
  return habit.minimum.every((_, index) => isStepDone(habitId, "minimum", index, date));
}

function isIdealComplete(habitId, date = todayKey()) {
  const habit = getHabit(habitId);
  return isMinimumComplete(habitId, date) && habit.ideal.every((_, index) => isStepDone(habitId, "ideal", index, date));
}

function completedToday() {
  return habits.filter((habit) => isMinimumComplete(habit.id));
}

function completionRatio(date = todayKey()) {
  const count = habits.filter((habit) => isMinimumComplete(habit.id, date)).length;
  return count / habits.length;
}

function daySuccess(date) {
  return completionRatio(date) === 1;
}

function dayIdealSuccess(date) {
  return habits.every((habit) => isIdealComplete(habit.id, date));
}

function calculateDayMomentum(date) {
  const minimums = habits.filter((habit) => isMinimumComplete(habit.id, date)).length;
  const ideals = habits.filter((habit) => isIdealComplete(habit.id, date)).length;
  const minimumBonus = minimums === habits.length ? ALL_MINIMUMS_BONUS : 0;
  const idealBonus = ideals === habits.length ? ALL_IDEALS_BONUS : 0;

  return minimums * MINIMUM_XP + ideals * IDEAL_XP + minimumBonus + idealBonus;
}

function calculateMomentum() {
  const baseMomentum = calculateBaseMomentum();
  return baseMomentum + calculateAchievementMomentum(baseMomentum);
}

function calculateBaseMomentum() {
  return Object.keys(state.completions).reduce((total, date) => total + calculateDayMomentum(date), 0);
}

function calculateAchievementMomentum(baseMomentum = calculateBaseMomentum()) {
  let achievementMomentum = 0;

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const stats = buildStatsSnapshot(baseMomentum, achievementMomentum);
    const nextMomentum = achievements
      .filter((achievement) => achievement.test(stats))
      .reduce((total, achievement) => total + achievement.reward, 0);

    if (nextMomentum === achievementMomentum) return achievementMomentum;
    achievementMomentum = nextMomentum;
  }

  return achievementMomentum;
}

function buildAllTimeStats(baseMomentum = calculateBaseMomentum()) {
  const achievementMomentum = calculateAchievementMomentum(baseMomentum);
  const stats = buildStatsSnapshot(baseMomentum, achievementMomentum);
  return {
    ...stats,
    achievementsUnlocked: achievements.filter((achievement) => achievement.test(stats)).length,
  };
}

function buildStatsSnapshot(baseMomentum, achievementMomentum) {
  const dates = Object.keys(state.completions);
  const habitMinimums = Object.fromEntries(habits.map((habit) => [habit.id, 0]));
  const habitIdeals = Object.fromEntries(habits.map((habit) => [habit.id, 0]));
  let minimumHabits = 0;
  let idealHabits = 0;
  let perfectDays = 0;
  let idealDays = 0;
  let activeDays = 0;

  dates.forEach((date) => {
    const minimumsToday = habits.filter((habit) => isMinimumComplete(habit.id, date));
    const idealsToday = habits.filter((habit) => isIdealComplete(habit.id, date));

    minimumHabits += minimumsToday.length;
    idealHabits += idealsToday.length;
    if (minimumsToday.length || idealsToday.length) activeDays += 1;
    if (minimumsToday.length === habits.length) perfectDays += 1;
    if (idealsToday.length === habits.length) idealDays += 1;

    minimumsToday.forEach((habit) => {
      habitMinimums[habit.id] += 1;
    });
    idealsToday.forEach((habit) => {
      habitIdeals[habit.id] += 1;
    });
  });

  const totalMomentum = baseMomentum + achievementMomentum;

  return {
    baseMomentum,
    achievementMomentum,
    totalMomentum,
    level: getLevelFromMomentum(totalMomentum).level,
    minimumHabits,
    idealHabits,
    perfectDays,
    idealDays,
    activeDays,
    bestStreak: bestStreak(),
    currentStreak: perfectStreak(),
    habitMinimums,
    habitIdeals,
  };
}

function perfectStreak() {
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!daySuccess(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function bestStreak() {
  const days = Object.keys(state.completions).sort();
  let best = 0;
  let run = 0;
  let previous = null;

  days.forEach((key) => {
    const date = new Date(`${key}T00:00:00`);
    const isNext =
      previous && (date.getTime() - previous.getTime()) / 86400000 === 1;

    run = daySuccess(key) ? (isNext ? run + 1 : 1) : 0;
    best = Math.max(best, run);
    previous = date;
  });

  return best;
}

function habitStreak(habitId) {
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!isMinimumComplete(habitId, key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function habitBest(habitId) {
  const days = Object.keys(state.completions).sort();
  let best = 0;
  let run = 0;
  let previous = null;

  days.forEach((key) => {
    const date = new Date(`${key}T00:00:00`);
    const isNext =
      previous && (date.getTime() - previous.getTime()) / 86400000 === 1;

    run = isMinimumComplete(habitId, key) ? (isNext ? run + 1 : 1) : 0;
    best = Math.max(best, run);
    previous = date;
  });

  return best;
}

function levelInfo() {
  const allTimeMomentum = state.allTimeMomentum || calculateMomentum();
  return getLevelFromMomentum(allTimeMomentum);
}

function momentumNeededForLevel(level) {
  return Math.round(LEVEL_BASE_COST * LEVEL_GROWTH ** (level - 1));
}

function getLevelFromMomentum(momentum) {
  let level = 1;
  let remaining = momentum;
  let levelCost = momentumNeededForLevel(level);

  while (remaining >= levelCost) {
    remaining -= levelCost;
    level += 1;
    levelCost = momentumNeededForLevel(level);
  }

  return {
    level,
    current: remaining,
    target: levelCost,
    needed: levelCost - remaining,
    progress: Math.round((remaining / levelCost) * 100),
  };
}

function toggleStep(habitId, type, index) {
  const date = todayKey();
  state.completions[date] = state.completions[date] || {};

  const habit = getHabit(habitId);
  const record = recordFor(habitId, date);
  record.minimum = record.minimum || {};
  record.ideal = record.ideal || {};
  state.completions[date][habitId] = record;

  const hadMinimum = isMinimumComplete(habitId, date);
  const hadIdeal = isIdealComplete(habitId, date);
  const hadPerfectMinimums = daySuccess(date);
  const hadPerfectIdeals = dayIdealSuccess(date);
  const beforeMomentum = calculateMomentum();

  if (record[type][index]) {
    delete record[type][index];
  } else {
    record[type][index] = true;
  }

  const hasMinimum = isMinimumComplete(habitId, date);
  const hasIdeal = isIdealComplete(habitId, date);
  const hasPerfectMinimums = daySuccess(date);
  const hasPerfectIdeals = dayIdealSuccess(date);
  const afterMomentum = calculateMomentum();
  const delta = afterMomentum - beforeMomentum;
  syncMomentum();

  if (!hadMinimum && hasMinimum) {
    record.minRewarded = true;
    showToast(`✦ +${delta} Momentum: ${habit.name} evolved`);
    if (navigator.vibrate) navigator.vibrate(24);
  }

  if (hadMinimum && !hasMinimum) {
    record.minRewarded = false;
    showToast(`${delta} Momentum: ${habit.name} minimum unchecked`);
  }

  if (!hadIdeal && hasIdeal) {
    record.idealRewarded = true;
    showToast(`✦ +${delta} Momentum: ${habit.name} ideal complete`);
    if (navigator.vibrate) navigator.vibrate([20, 20, 20]);
  }

  if (hadIdeal && !hasIdeal) {
    record.idealRewarded = false;
    showToast(`${delta} Momentum: ${habit.name} ideal unchecked`);
  }

  if (!hadPerfectMinimums && hasPerfectMinimums) {
    showToast(`✦ +${delta} Momentum: all minimums cleared`);
  }

  if (!hadPerfectIdeals && hasPerfectIdeals) {
    showToast(`✦ +${delta} Momentum: all ideals cleared`);
  }

  saveState();
  render();
}

function setTab(tab) {
  activeTab = tab;
  render();
}

function resetToday() {
  state.completions[todayKey()] = {};
  syncMomentum();
  saveState();
  render();
}

function buyReward(rewardId) {
  syncMomentum();
  const reward = shopRewards.find((item) => item.id === rewardId);
  if (!reward || reward.status !== "active") return;

  const blockedReason = rewardBlockedReason(reward);
  if (blockedReason) {
    showToast(blockedReason);
    return;
  }

  if (state.momentum < reward.cost) {
    showToast(`Need ${reward.cost - state.momentum} more Momentum`);
    return;
  }

  state.spentMomentum += reward.cost;
  state.purchases.push({
    id: reward.id,
    title: reward.title,
    cost: reward.cost,
    date: new Date().toISOString(),
  });
  saveState();
  showToast(`Redeemed: ${reward.title}`);
  render();
}

function rewardBlockedReason(reward) {
  if (!daySuccess(todayKey())) return "Finish today's minimums before buying rewards";
  if (!reward.repeatable && hasPurchasedReward(reward.id)) return "Already redeemed";
  if (reward.cooldown && purchasesInLastDays(reward.id, reward.cooldown.days) >= reward.cooldown.limit) {
    return `Cooldown active: ${reward.cooldown.limit} per ${reward.cooldown.days} days`;
  }
  return "";
}

function hasPurchasedReward(rewardId) {
  return (state.purchases || []).some((purchase) => purchase.id === rewardId);
}

function purchasesInLastDays(rewardId, days) {
  const since = Date.now() - days * 86400000;
  return (state.purchases || []).filter((purchase) => {
    return purchase.id === rewardId && new Date(purchase.date).getTime() >= since;
  }).length;
}

function render() {
  syncMomentum();
  const { level, current, target, needed, progress } = levelInfo();
  const done = completedToday();
  const ratio = completionRatio();
  const quote = quotes[new Date().getDay() % quotes.length];
  const recovery = perfectStreak() === 0 && Object.keys(state.completions).length > 0;
  if (activeTab === "settings") activeTab = "shop";
  if (activeTab === "quests" || activeTab === "progress" || activeTab === "calendar") activeTab = "home";

  document.querySelector("#app").innerHTML = `
    <main class="app">
      <header class="topbar">
        <div class="brand">
          <div>
            <p class="eyebrow">Momentum</p>
            <h1>Execute today, ${state.name}</h1>
          </div>
        </div>
        <div class="header-meta">
          <span class="badge momentum-badge">✦ ${state.momentum} Available</span>
          <p class="date">${new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}</p>
        </div>
      </header>

      ${screenHome({ level, current, target, needed, progress, done, ratio, quote, recovery })}
      ${screenHabits()}
      ${screenAchievements()}
      ${screenShop()}

      <nav class="nav">
        ${["home", "habits", "achievements", "shop"]
          .map(
            (tab) => `
              <button class="${activeTab === tab ? "active" : ""}" onclick="setTab('${tab}')">
                ${tab[0].toUpperCase() + tab.slice(1)}
              </button>
            `,
          )
          .join("")}
      </nav>
      <div id="toast" class="toast"></div>
    </main>
  `;
}

function screenHome({ level, current, target, needed, progress, done, ratio, quote, recovery }) {
  return `
    <section class="screen ${activeTab === "home" ? "active" : ""}">
      <div class="grid home-grid">
        <div class="card hero">
          <div class="level-row">
            <div>
              <p class="eyebrow">Current Level</p>
              <div class="level">Lv. <span>${level}</span></div>
            </div>
            <span class="badge momentum-badge">✦ ${state.momentum} Available</span>
          </div>
          <div>
            <div class="stat-row">
              <p class="muted">${needed} all-time Momentum until next level</p>
              <p class="muted">${current}/${target}</p>
            </div>
            <div class="bar"><div class="fill" style="width: ${progress}%"></div></div>
          </div>
          <p class="quote">${quote}</p>
          <div class="stats">
            <div class="stat"><span class="muted">Today</span><strong>${done.length}/${habits.length}</strong></div>
            <div class="stat"><span class="muted">All-time</span><strong>${state.allTimeMomentum}</strong></div>
            <div class="stat"><span class="muted">Available</span><strong>${state.momentum}</strong></div>
            <div class="stat"><span class="muted">🔥 Perfect streak</span><strong>${perfectStreak()}</strong></div>
            <div class="stat"><span class="muted">★ Best streak</span><strong>${bestStreak()}</strong></div>
            <div class="stat"><span class="muted">Minimums done</span><strong>${totalMinimumStepsDone()}/${totalMinimumSteps()}</strong></div>
          </div>
        </div>

        <div class="grid">
          <div class="banner ${recovery ? "show" : ""}">
            <strong>Recovery Mode</strong>
            <p class="muted">No punishment. Win the next minimum and keep moving.</p>
          </div>
          <div class="card">
            <p class="eyebrow">Today's Mission</p>
            <h2>Complete the minimums.</h2>
            <p class="muted">Check each requirement. Ideals unlock after the quest evolves.</p>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="quest-head">
          <div>
            <p class="eyebrow">Quick Quests</p>
            <h2>Finish each checklist to evolve the quest</h2>
          </div>
          <span class="badge">${Math.round(ratio * 100)}%</span>
        </div>
        <div class="quest-list" style="margin-top:14px">${habitCards(true)}</div>
      </div>
    </section>
  `;
}

function screenHabits() {
  return `
    <section class="screen ${activeTab === "habits" ? "active" : ""}">
      <div class="card">
        <p class="eyebrow">Habits</p>
        <h2>Your daily requirements.</h2>
        <p class="muted">Use this page as a clean reference for what each habit means.</p>
      </div>
      <div class="quest-list" style="margin-top:16px">${habitReferenceCards()}</div>
    </section>
  `;
}

function habitReferenceCards() {
  return habits
    .map(
      (habit) => `
        <article class="quest-card reference-card">
          <div class="quest-head">
            <div>
              <p class="eyebrow">Daily Habit</p>
              <h3><span class="habit-icon">${habit.icon}</span>${habit.name}</h3>
            </div>
            <span class="badge">+${MINIMUM_XP} / +${IDEAL_XP}</span>
          </div>
          <div class="tasks">
            <span class="task-title">Minimum</span>
            ${plainList(habit.minimum)}
          </div>
          <div class="tasks">
            <span class="task-title">Ideal</span>
            ${plainList(habit.ideal)}
          </div>
        </article>
      `,
    )
    .join("");
}

function plainList(items) {
  return items.map((item) => `<div class="plain-row">${item}</div>`).join("");
}

function habitCards(compact) {
  return habits
    .map(
      (habit) => `
        <article class="quest-card ${isMinimumComplete(habit.id) ? "done evolved" : ""}">
          <div class="quest-head">
            <div>
              <p class="eyebrow">${compact ? "Quest" : `Streak ${habitStreak(habit.id)} / Best ${habitBest(habit.id)}`}</p>
              <h3><span class="habit-icon">${habit.icon}</span>${habit.name}</h3>
            </div>
            <span class="badge">+${MINIMUM_XP} / +${IDEAL_XP}</span>
          </div>
          <div class="tasks">
            <span class="task-title">Minimum</span>
            ${checklist(habit, "minimum")}
          </div>
          <div class="ideal-panel ${isMinimumComplete(habit.id) ? "show" : ""}">
            <div class="task-title">${isIdealComplete(habit.id) ? "Ideal Complete" : "Ideal Unlocked"}</div>
            <div class="tasks">${checklist(habit, "ideal")}</div>
          </div>
          <div class="quest-status">
            ${isIdealComplete(habit.id) ? "Ideal cleared" : isMinimumComplete(habit.id) ? "Minimum cleared. Bonus level unlocked." : "Minimum in progress"}
          </div>
        </article>
      `,
    )
    .join("");
}

function checklist(habit, type) {
  return habit[type]
    .map(
      (item, index) => `
        <label class="check-row">
          <input
            type="checkbox"
            ${isStepDone(habit.id, type, index) ? "checked" : ""}
            ${type === "ideal" && !isMinimumComplete(habit.id) ? "disabled" : ""}
            onchange="toggleStep('${habit.id}', '${type}', ${index})"
          />
          <span>${item}</span>
        </label>
      `,
    )
    .join("");
}

function screenAchievements() {
  const stats = buildAllTimeStats();
  const unlocked = achievements.filter((achievement) => achievement.test(stats));

  return `
    <section class="screen ${activeTab === "achievements" ? "active" : ""}">
      <div class="card">
        <div class="quest-head">
          <div>
            <p class="eyebrow">Achievements</p>
            <h2>Proof you are becoming consistent.</h2>
          </div>
          <span class="badge">${unlocked.length}/${achievements.length}</span>
        </div>
        <div class="all-time-stats">
          <div class="stat achievement-stat"><span class="muted">All-time Momentum</span><strong>${stats.totalMomentum}</strong></div>
          <div class="stat achievement-stat"><span class="muted">Achievement XP</span><strong>+${stats.achievementMomentum}</strong></div>
          <div class="stat achievement-stat"><span class="muted">Perfect days</span><strong>${stats.perfectDays}</strong></div>
          <div class="stat achievement-stat"><span class="muted">Best streak</span><strong>${stats.bestStreak}</strong></div>
          <div class="stat achievement-stat"><span class="muted">Minimum habits</span><strong>${stats.minimumHabits}</strong></div>
          <div class="stat achievement-stat"><span class="muted">Ideal habits</span><strong>${stats.idealHabits}</strong></div>
        </div>
      </div>
      <div class="achievement-grid" style="margin-top:16px">${achievementCards(stats)}</div>
    </section>
  `;
}

function achievementCards(stats) {
  return achievements
    .map((achievement) => {
      const unlocked = achievement.test(stats);
      return `
        <article class="achievement-card ${unlocked ? "unlocked" : ""}">
          <div class="achievement-icon">${achievement.icon}</div>
          <div>
            <div class="achievement-topline">
              <h3>${achievement.title}</h3>
              <span class="badge">+${achievement.reward}</span>
            </div>
            <p class="muted">${achievement.description}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function screenShop() {
  const purchases = state.purchases || [];
  const minimumsComplete = daySuccess(todayKey());

  return `
    <section class="screen ${activeTab === "shop" ? "active" : ""}">
      <div class="card">
        <div class="quest-head">
          <div>
            <p class="eyebrow">Shop</p>
            <h2>Spend Momentum on real rewards.</h2>
            <p class="muted">All-Time Momentum keeps your level. Available Momentum is what you can spend.</p>
          </div>
          <span class="badge momentum-badge">✦ ${state.momentum}</span>
        </div>
        <div class="shop-gate ${minimumsComplete ? "ready" : ""}">
          ${minimumsComplete ? "Shop unlocked for today. Minimums complete." : "Complete all of today's minimums to unlock purchases."}
        </div>
        <div class="shop-wallet">
          <div class="stat"><span class="muted">Available</span><strong>${state.momentum}</strong></div>
          <div class="stat"><span class="muted">All-time earned</span><strong>${state.allTimeMomentum}</strong></div>
          <div class="stat"><span class="muted">Spent</span><strong>${state.spentMomentum || 0}</strong></div>
        </div>
      </div>

      <div class="shop-grid" style="margin-top:16px">
        ${shopRewards.map(shopCard).join("")}
      </div>

      <div class="card" style="margin-top:16px">
        <p class="eyebrow">Purchase History</p>
        <div class="purchase-list">
          ${
            purchases.length
              ? purchases
                  .slice()
                  .reverse()
                  .map(
                    (purchase) => `
                      <div class="purchase-row">
                        <span>${purchase.title}</span>
                        <strong>-${purchase.cost}</strong>
                      </div>
                    `,
                  )
                  .join("")
              : `<p class="muted">No rewards redeemed yet.</p>`
          }
        </div>
      </div>
    </section>
  `;
}

function shopCard(reward) {
  const active = reward.status === "active";
  const affordable = state.momentum >= reward.cost;
  const blockedReason = active ? rewardBlockedReason(reward) : "Coming soon";
  const largeSpend = active && state.momentum > 0 && reward.cost / state.momentum >= 0.5;
  const canRedeem = active && affordable && !blockedReason;

  return `
    <article class="shop-card ${active ? "" : "draft"}">
      <div>
        <p class="eyebrow">${reward.tier} · ${reward.category}</p>
        <h3>${reward.title}</h3>
        <p class="muted">${reward.description}</p>
        <p class="shop-why">${reward.why}</p>
        <p class="shop-rules">${reward.rules}</p>
        ${largeSpend ? `<p class="shop-warning">This spends a large portion of your available Momentum.</p>` : ""}
      </div>
      <div class="shop-card-bottom">
        <span class="badge">✦ ${reward.cost}</span>
        <button
          class="secondary"
          ${canRedeem ? "" : "disabled"}
          onclick="buyReward('${reward.id}')"
        >
          ${canRedeem ? "Redeem" : blockedReason || "Not enough"}
        </button>
      </div>
    </article>
  `;
}

function showToast(message) {
  setTimeout(() => {
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  });
}

function totalMinimumSteps() {
  return habits.reduce((total, habit) => total + habit.minimum.length, 0);
}

function totalMinimumStepsDone(date = todayKey()) {
  return habits.reduce((total, habit) => {
    return total + habit.minimum.filter((_, index) => isStepDone(habit.id, "minimum", index, date)).length;
  }, 0);
}

if ("serviceWorker" in navigator && typeof location !== "undefined" && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
