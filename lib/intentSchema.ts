export const INTENT_SCHEMA = {
  items: [
    {
      type: "task | decision | follow_up | info",
      text: "",
      urgency: "low | medium | high",
      confidence: 0.0,
    },
  ],
};
