// In this file you can specify the trial data for your experiment

const picture_prefix = ["1_50","2_50","3_50","4_50","5_50","6_50","7_50","8_50","9_50","10_50","11_50","12_50","13_50","14_50","15_50",
"1_150","2_150","3_150","4_150","5_150","6_150","7_150","8_150","9_150","10_150","11_150","12_150","13_150","14_150","15_150"]

var same_pic = _.shuffle(picture_prefix);
var different_pic = _.shuffle(picture_prefix);

const nr_trials_practice = 12;
const nr_trials_main = 60-nr_trials_practice;

create_n_trials = function (nr_trials) {
  return _.map(_.range(nr_trials), function () {
      if (same_pic.length==0) {
            var trial = {
                number: different_pic[0].split("_")[0],
                rotation: different_pic[0].split("_")[1],
                relationship: "different",
                picture: `images/mental_rotation_images/${different_pic[0]}_different.jpg`,
                key1: "f",
                key2: "j",
                f: f_key,
                j: j_key,
                expected: "different"
            }
      } else if (different_pic.length==0) {
            var trial = {
                number: same_pic[0].split("_")[0],
                rotation: same_pic[0].split("_")[1],
                relationship: "same",
                picture: `images/mental_rotation_images/${same_pic[0]}_same.jpg`,
                key1: "f",
                key2: "j",
                f: f_key,
                j: j_key,
                expected: "same"
            }
      } else {
            var trial = _.sample([
                {
                    number: same_pic[0].split("_")[0],
                    rotation: same_pic[0].split("_")[1],
                    relationship: "same",
                    picture: `images/mental_rotation_images/${same_pic[0]}_same.jpg`,
                    key1: "f",
                    key2: "j",
                    f: f_key,
                    j: j_key,
                    expected: "same"
                },{
                    number: different_pic[0].split("_")[0],
                    rotation: different_pic[0].split("_")[1],
                    relationship: "different",
                    picture: `images/mental_rotation_images/${different_pic[0]}_different.jpg`,
                    key1: "f",
                    key2: "j",
                    f: f_key,
                    j: j_key,
                    expected: "different"
                }
            ]);
        }       
    if (trial.relationship === "same"){
        same_pic.shift();
    } else {
        different_pic.shift();
    }
    return trial;
  });
}

rotation_trial_practice = create_n_trials(nr_trials_practice);
rotation_trial_main = create_n_trials(nr_trials_main);