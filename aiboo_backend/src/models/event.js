const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  agent_id: String,
  event_type: String,
  data: Object,

  severity: { type: String },
  summary: { type: String },
  reason: { type: String },

  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", EventSchema);
