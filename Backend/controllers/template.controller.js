const test_templates = [
  {name: 'Went well - To improve - Action Items', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Start - Stop - Continue', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Mad - Sad - Glad', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Starfish', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: '4 L\'s: Liked – Learned – Lacked – Longed For', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Lean Coffee: To Discuss - Discussing - Discussed', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Three Little Pigs', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Speed Car: Parachute - Engine', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Sailboat: Anchors - Sail', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'KALM: Keep - Add - Less - More', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'Original 4', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
  {name: 'DAKI: Drop - Add - Keep - Improve', columns: [{name: "Went Well", color: "#009688"}, {name: "To Improve", color: "#e91e63"}, {name: "Action Items", color: "#9c27b0"}]},
];

const Template = require('../models/template.model.js');

exports.createTemp = () => {
  Template.find({})
    .then(templates => {
      if (!templates.length) {
        test_templates.map((loop_template, indx) => {
          const new_template = new Template({
            name: loop_template.name,
            columns: loop_template.columns,
          });
          new_template.save();
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.getAll = (res) => {
  Template.find()
    .then(templates => {
      res.send(templates);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};