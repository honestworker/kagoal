const test_templates = [
  {id: 0, name: 'Went well - To improve - Action Items'},
  {id: 1, name: 'Start - Stop - Continue'},
  {id: 2, name: 'Mad - Sad - Glad'},
  {id: 3, name: 'Starfish'},
  {id: 4, name: '4 L\'s: Liked – Learned – Lacked – Longed For'},
  {id: 5, name: 'Lean Coffee: To Discuss - Discussing - Discussed'},
  {id: 6, name: 'Three Little Pigs'},
  {id: 7, name: 'Speed Car: Parachute - Engine'},
  {id: 8, name: 'Sailboat: Anchors - Sail'},
  {id: 9, name: 'KALM: Keep - Add - Less - More'},
  {id: 10, name: 'Original 4'},
  {id: 11, name: 'DAKI: Drop - Add - Keep - Improve'},
];

const Template = require('../models/template.model.js');

exports.createTemp = () => {
  Template.find({})
    .then(templates => {
      if (!templates.length) {
        test_templates.map((loop_template, indx) => {
          const new_template = new Template({
            name: loop_template.name,
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