// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `This is a first work with magpie.
        <br />
        It is a realization of the 'mental rotation' experiment for the 2020 'Experimental Psychology Lab' seminar.
        <br />
        Thank you for taking the time to participate in this experiment.`,
  buttonText: 'begin the experiment'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  text: `On the next sites you will be shown 60 pairs of 3-dimensional objects that are either the same or just similar.
            <br/>
            The presented pictures will look like this:
            <img src="images/mental_rotation_images/1_50_different.jpg" />
            <br/>
            <br/>
            Your task is to decide if the objects are the <b>same</b> or <b>different</b>.
            <br/>
            <br/>
            We will have a small practice before the main experiment starts.
            <br/>
            The keys are and f -> <b>${f_key}</b> and j -> <b>${j_key}</b> 
            <br/>
            <br/>
            Try to be as <b>fast and accurate</b> as possible.
            <br/>`,
  buttonText: 'Start practice'
});

const begin = magpieViews.view_generator("begin", {
  trials: 1,
  name: 'begin',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `<b>Very good!</b> The next part will be the actual test session.<br/><br/>
            Remember: Try to be as <b>fast and accurate</b> as possible.`,
  buttonText: 'Start test'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional, but your answers will help us analyze our results.',

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/



const mental_rotation_practice = magpieViews.view_generator("key_press", {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: nr_trials_practice,
  pause: 250,
  // name should be identical to the variable name
  name: 'mental_rotation_practice',
  data: rotation_trial_practice,
  // you can add custom functions at different stages through a view's life cycle
  hook: {
    after_response_enabled: check_response
  }
},{
  stimulus_container_generator: function(config, CT) {
    return `<div class="magpie-view" id="view">
      <h1 class='magpie-view-title'>${config.title}</h1>
      <p class='magpie-response-keypress-header' id = 'keypress_header'>
        <strong>${config.data[CT].key1}</strong> = ${config.data[CT][config.data[CT].key1]},
        <strong>${config.data[CT].key2}</strong> = ${config.data[CT][config.data[CT].key2]}
      </p>
      <div class='magpie-view-stimulus-container' id = 'image'>
        <div class='magpie-view-stimulus magpie-nodisplay'></div>
      </div>
    </div>`;
  }
});

const mental_rotation_main = magpieViews.view_generator("key_press", {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: nr_trials_main,
  pause: 250,
  // name should be identical to the variable name
  name: 'mental_rotation_main',
  data: rotation_trial_main,
  // you can add custom functions at different stages through a view's life cycle
  hook: {
    after_pause: time_limit
  }
},{
  stimulus_container_generator: function(config, CT) {
    return `<div class="magpie-view" id="view">
      <h1 class='magpie-view-title'>${config.title}</h1>
      <p class='magpie-response-keypress-header' id = 'keypress_header'>
        <strong>${config.data[CT].key1}</strong> = ${config.data[CT][config.data[CT].key1]},
        <strong>${config.data[CT].key2}</strong> = ${config.data[CT][config.data[CT].key2]}
      </p>
      <div class='magpie-view-stimulus-container' id = 'image'>
        <div class='magpie-view-stimulus magpie-nodisplay'></div>
      </div>
    </div>`;
  }
});

// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale