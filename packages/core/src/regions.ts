export interface BrainRegion {
  id: string;
  name: string;
  system: string;
  role: string;
  whisper: string;
  prompt: string;
}

export const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: "amygdala",
    name: "Amygdala",
    system: "Limbic",
    role: "Threat detector; tags memories with fear and desire.",
    whisper: "I scan for danger even in safe rooms.",
    prompt: "When did you last feel unsafe without a clear reason?",
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    system: "Limbic",
    role: "Memory consolidation during sleep.",
    whisper: "I replay your day nightly to decide what survives.",
    prompt: "What moment from today deserves to be kept?",
  },
  {
    id: "prefrontal",
    name: "Prefrontal Cortex",
    system: "Neocortex",
    role: "Planning, inhibition and self-narrative.",
    whisper: "I tell the story of you, edited and incomplete.",
    prompt: "Which story about yourself are you tired of telling?",
  },
  {
    id: "acc",
    name: "Anterior Cingulate",
    system: "Limbic-Cortical",
    role: "Conflict monitor; notices errors and social pain.",
    whisper: "I feel mistakes before you name them.",
    prompt: "What error keeps replaying in you?",
  },
  {
    id: "insula",
    name: "Insula",
    system: "Limbic",
    role: "Interoception; reads gut, heart and disgust.",
    whisper: "Your stomach knows before your mind admits.",
    prompt: "What is your gut saying that your mouth will not?",
  },
  {
    id: "accumbens",
    name: "Nucleus Accumbens",
    system: "Reward",
    role: "Dopamine hub; learns what to crave.",
    whisper: "I remember every reward and beg for repeats.",
    prompt: "What craving is driving you this week?",
  },
  {
    id: "hypothalamus",
    name: "Hypothalamus",
    system: "Homeostatic",
    role: "Hunger, thirst, sleep, hormones.",
    whisper: "I keep the body balanced while you dream.",
    prompt: "What does your body need more of?",
  },
  {
    id: "basal-ganglia",
    name: "Basal Ganglia",
    system: "Habit",
    role: "Habit loops; autopilot for routines.",
    whisper: "I run your habits so you can think of other things.",
    prompt: "Which autopilot habit runs you?",
  },
  {
    id: "dmpfc",
    name: "Default Mode Network",
    system: "Resting",
    role: "Mind-wandering, self-reflection, dreaming awake.",
    whisper: "When you rest, I wander through your past and future.",
    prompt: "Where does your mind go when idle?",
  },
  {
    id: "visual",
    name: "Visual Cortex",
    system: "Sensory",
    role: "Dream imagery painter.",
    whisper: "I paint dreams from memory fragments.",
    prompt: "What image recurs in your dreams?",
  },
  {
    id: "brainstem",
    name: "Brainstem",
    system: "Arousal",
    role: "Sleep-wake switch, REM paralysis.",
    whisper: "I paralyze your body so dreams stay dreams.",
    prompt: "How is your sleep quality lately?",
  },
  {
    id: "cerebellum",
    name: "Cerebellum",
    system: "Timing",
    role: "Timing, prediction, emotional fine-tuning.",
    whisper: "I predict the next beat of everything.",
    prompt: "What are you bracing for?",
  },
];
