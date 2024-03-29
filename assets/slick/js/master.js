// Put all your page JS here

$(function () {
    $('#slickQuiz').slickQuiz({
      checkAnswerText:  'Vérifier',
      nextQuestionText: 'Suivante &raquo;',
      backButtonText: '&laquo; Précédente',
      completeQuizText: '',
      tryAgainText: 'Recommencer',
      questionCountText: 'Question %current sur %total',
      preventUnansweredText: 'Vous devez sélectionner au moins une réponse.',
      questionTemplateText:  'Question %count.',
      scoreTemplateText: '%score / %total',
      nameTemplateText:  '<span>Quiz: </span>%name',
      disableRanking: true,
      randomSortQuestions: false,
      randomSortAnswers: true
    });
});