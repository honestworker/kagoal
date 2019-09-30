const { User } = require('../models/user.model.js');
const Team = require('../models/team.model.js');

exports.getAll = (req, res) => {
  Team.find()
    .then(teams => {
      res.send(teams);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.createTeamWidhName = (name) => {
  const team = new Team({
    name: name,
    path: '',
    members: []
  });

  return team;
};

exports.getTeamsByUser = (id, res) => {
  Team.findOne({user: id, path: ''})
    .populate('user', 'full_name')
    .exec(function(err1, team) {
      if (err1) {
        res.status(500).send({
          message: err1.message
        });
      } else {
        const teams_data = [];
        if (team) {
          teams_data.push({
            id: team._id,
            parentId: null,
            name: team.name,
            board: team.board,
            description: team.description,
            created_at: team.created_at,
            user: team.user.full_name,
          });
          const reg_path = "^\/" + team.id;
          Team.find({path: {'$regex': reg_path}})
            .populate('user', 'full_name')
            .exec(function(err2, teams) {
              if (err2) {
                res.status(500).send({
                  message: err1.message
                });
              } else {
                const loop_teams = teams;
                teams.map((loop_team, indx) => {
                  const parent_path = loop_team.path.substring(0, loop_team.path.lastIndexOf('/'));
                  let parent_id = team._id;
                  if (parent_path) {
                    for (var team_indx = 0; team_indx < loop_teams.length; team_indx++) {
                      if (loop_teams[team_indx].path + "/" + loop_teams[team_indx]._id === loop_team.path) {
                        parent_id = loop_teams[team_indx]._id;
                      }
                    }
                  }
                  teams_data.push({
                    id: loop_team._id,
                    parentId: parent_id,
                    name: loop_team.name,
                    board: loop_team.board,
                    description: loop_team.description,
                    created_at: loop_team.created_at,
                    user: team.user.full_name,
                  });
                });
                res.send(teams_data);
              }
          });
        } else {
          res.send(teams_data);
        }
      }
    });
}

exports.getTeam = (id, res) => {
  Team.findOne({"_id": id})
    .then(team => {
      if (team) {
        const res_team = {
          id: team._id,
          name: team.name,
          description: team.description,
          board: team.board,
          // user: team.user,
          parentId: team.path.substring(team.path.lastIndexOf('/') + 1),
          created_at: team.created_at,
        };
        res.send(res_team);
      } else {
        res.status(402).send({
          message: "Can not find the team"
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.updateTeam = (id, data, res) => {
  Team.findOne({"name": data.name, "_id": { $ne: id } })
    .then(team => {
      if (team) {
        res.status(402).send({
          name: "Can not create the duplicated name"
        });
      } else {
        Team.findOne({"_id": id})
          .then(team => {
            if (data.parentId) {
              Team.findOne({"_id": data.parentId})
                .then(parent_team => {
                  const team_path = team.path + '/' + team._id;
                  let new_path = '';
                  if (parent_team) {
                    new_path = parent_team.path + "/" + parent_team._id;
                  }
                  const reg_path = "^" + team_path.replace("/", "\/");
                  Team.find({path: {'$regex': reg_path}})
                    .then(teams => {
                      teams.map((loop_team, indx) => {
                        if (loop_team._id !== team._id) {
                          loop_team.path = loop_team.path.replace(team.path, new_path);
                          loop_team.save();
                        }
                      });
                      team.name = data.name;
                      team.description = data.description;
                      team.path = new_path;
                      team.board = data.board;
                      team.updated_at = new Date();
                      team.save().then(new_team => res.send(new_team));
                    })
                }).catch(err => {
                  res.status(500).send({
                    message: err.message
                  });
                });
            } else {
              team.name = data.name;
              team.description = data.description;
              team.board = data.board;
              team.updated_at = new Date();
              team.save().then(new_team => res.send(new_team));        
            }
          }).catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.createTeam = (user_id, data, res) => {
  Team.findOne({"name": data.name})
    .then(team => {
      if (team) {
        res.status(402).send({
          name: "Can not create the duplicated name"
        });
      } else {
        Team.findOne({"_id": data.parentId})
        .then(parent_team => {
          const new_team = new Team({
            name: data.name,
            description: data.description,
            path: parent_team.path + "/" + parent_team._id,
            board: data.board,
            members: [],
            user: user_id
          });
          new_team.save()
            .then(update_team => {
              res.send(update_team)
            });
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.deleteTeam = (id, res) => {
  Team.findOne({"_id": id})
    .then(team => {
      if (team.path) {
        const team_path = team.path + "/" + team._id;
        const reg_path = "^" + team_path.replace("/", "\/");
        Team.find({path: {'$regex': reg_path}})
          .then(teams => {
            teams.map((loop_team, indx) => {
              loop_team.remove();
            });
          });
        team.remove();
        res.send("OK");
      } else {
        res.status(402).send({
          message: "Can not delete the root team"
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.getTeamsAsTree = (user_id, res) => {
  Team.findOne({"user": user_id})
    .populate('user', 'full_name')
    .exec(function(err1, team) {
      if (err1) {
        res.status(500).send({
          message: err1.message
        });
      } else {
        const teams_data = [];
        if (team) {
          teams_data.push({
            id: team._id,
            parentId: null,
            name: team.name,
            board: team.board,
            description: team.description,
            created_at: team.created_at,
            user: team.user.full_name,
            path: team.path,
          });
          const reg_path = "^\/" + team.id;
          Team.find({path: {'$regex': reg_path}})
            .populate('user', 'full_name')
            .exec(function(err2, teams) {
              if (err2) {
                res.status(500).send({
                  message: err1.message
                });
              } else {
                const loop_teams = teams;
                teams.map((loop_team, indx) => {
                  const parent_path = loop_team.path.substring(0, loop_team.path.lastIndexOf('/'));
                  let parent_id = team._id;
                  if (parent_path) {
                    for (var team_indx = 0; team_indx < loop_teams.length; team_indx++) {
                      if (loop_teams[team_indx].path + "/" + loop_teams[team_indx]._id === loop_team.path) {
                        parent_id = loop_teams[team_indx]._id;
                      }
                    }
                  }
                  teams_data.push({
                    id: loop_team._id,
                    parentId: parent_id,
                    name: loop_team.name,
                    board: loop_team.board,
                    description: loop_team.description,
                    created_at: loop_team.created_at,
                    user: team.user.full_name,
                    path: loop_team.path,
                  });
                });

                teams_data.sort(function (a, b) {
                  return a.path.length - b.path.length;
                });

                const teams_tree_data = [];
                teams_data.map((team_data) => {
                  let children = teams_tree_data;
                  const paths = team_data.path.split("/");
                  if (paths.length) {
                    paths.forEach((loop_path) => {
                      if (loop_path) {
                        const chilrens = children;
                        chilrens.forEach((loop_children) => {
                          if (loop_children.id.toString() === loop_path) {
                            children = loop_children.children;
                          }
                        });
                      }
                    });
                  }
                  children.push({
                    id: team_data.id,
                    parentId: team_data.parentId,
                    name: team_data.name,
                    board: team_data.board,
                    description: team_data.description,
                    created_at: team_data.created_at,
                    user: team_data.full_name,
                    children: []
                  });
                });

                res.send(teams_tree_data);
              }
          });
        } else {
          res.send(teams_data);
        }
      }
    });
}

exports.getTeamsAsTreeById = (id, res) => {
  Team.findOne({"_id": id})
    .populate('user', 'full_name')
    .exec(function(err1, team) {
      if (err1) {
        res.status(500).send({
          message: err1.message
        });
      } else {
        const teams_data = [];
        if (team) {
          teams_data.push({
            id: team._id,
            parentId: null,
            name: team.name,
            board: team.board,
            description: team.description,
            created_at: team.created_at,
            user: team.user.full_name,
            path: team.path,
          });
          const reg_path = "^\/" + team.id;
          Team.find({path: {'$regex': reg_path}})
            .populate('user', 'full_name')
            .exec(function(err2, teams) {
              if (err2) {
                res.status(500).send({
                  message: err1.message
                });
              } else {
                const loop_teams = teams;
                teams.map((loop_team, indx) => {
                  const parent_path = loop_team.path.substring(0, loop_team.path.lastIndexOf('/'));
                  let parent_id = team._id;
                  if (parent_path) {
                    for (var team_indx = 0; team_indx < loop_teams.length; team_indx++) {
                      if (loop_teams[team_indx].path + "/" + loop_teams[team_indx]._id === loop_team.path) {
                        parent_id = loop_teams[team_indx]._id;
                      }
                    }
                  }
                  teams_data.push({
                    id: loop_team._id,
                    parentId: parent_id,
                    name: loop_team.name,
                    board: loop_team.board,
                    description: loop_team.description,
                    created_at: loop_team.created_at,
                    user: team.user.full_name,
                    path: loop_team.path,
                  });
                });

                teams_data.sort(function (a, b) {
                  return a.path.length - b.path.length;
                });

                const teams_tree_data = [];
                teams_data.map((team_data) => {
                  let children = teams_tree_data;
                  const paths = team_data.path.split("/");
                  if (paths.length) {
                    paths.forEach((loop_path) => {
                      if (loop_path) {
                        const chilrens = children;
                        chilrens.forEach((loop_children) => {
                          if (loop_children.id.toString() === loop_path) {
                            children = loop_children.children;
                          }
                        });
                      }
                    });
                  }
                  children.push({
                    id: team_data.id,
                    parentId: team_data.parentId,
                    name: team_data.name,
                    board: team_data.board,
                    description: team_data.description,
                    created_at: team_data.created_at,
                    user: team_data.full_name,
                    children: []
                  });
                });

                res.send(teams_tree_data);
              }
          });
        } else {
          res.send(teams_data);
        }
      }
    });
}