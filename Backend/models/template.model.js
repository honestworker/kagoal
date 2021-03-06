const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  columns: [
    {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true,
        default: '#ffffff'
      },
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

const Template = mongoose.model('templates', TemplateSchema);
module.exports = Template;

const TemplateSM = mongoose.model('Template', TemplateSchema);
module.exports = TemplateSM;