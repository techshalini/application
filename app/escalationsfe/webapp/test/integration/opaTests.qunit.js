sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'escalationsfe/test/integration/FirstJourney',
		'escalationsfe/test/integration/pages/EscalationsList',
		'escalationsfe/test/integration/pages/EscalationsObjectPage'
    ],
    function(JourneyRunner, opaJourney, EscalationsList, EscalationsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('escalationsfe') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEscalationsList: EscalationsList,
					onTheEscalationsObjectPage: EscalationsObjectPage
                }
            },
            opaJourney.run
        );
    }
);