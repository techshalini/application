

const cds = require('@sap/cds');

 

module.exports = cds.service.impl(async function () {


    this.on('resolve', async (req) => {

        const tx = cds.tx(req);

        const res = await tx.run(

            UPDATE('my.dataModel.Escalations')

                .set({ 'Status_code': 'CMP' })

                .where({ ID: req.params[0].ID })

        );

    });

 

    this.on('READ', 'PurchaseOrders', async (req) => {

        const po = await cds.connect.to('API_PURCHASEORDER_PROCESS_SRV');

        let result = po.tx(req).send(

            {

                query: req.query,

                headers: {

                    apiKey: process.env.apiKey

                }

            }

        );

        return result;

    });    
    this.before('NEW', 'Escalations', (req) => {

        // When the draft is created initially, default the status to 'Draft'

        req.data.status_code = 'DRF';

    });

 

    this.before('CREATE', 'Escalations', (req) => {

        // After creation, update the status to 'In Progress'

        req.data.status_code = 'INP';

    });

});