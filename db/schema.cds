using {

    managed,

    cuid,

    sap.common.CodeList as CodeList

} from '@sap/cds/common';

 

using {API_PURCHASEORDER_PROCESS_SRV as external} from '../srv/external/API_PURCHASEORDER_PROCESS_SRV';

 

namespace my.dataModel;

 

 

entity Statuses : CodeList {

    key code : String(3)

}

 

type Status : Association to Statuses;

 

entity Comments : managed, cuid {

    comment    : String;

    escalation : Association to Escalations;

}

 

entity Escalations : managed, cuid {

    description   : String(80);

    material      : String(30);

    purchaseOrder : Association to PurchaseOrders;

    expectedDate  : Date;

    status        : Status @(Common.Label: 'status')@readonly;

    comments      : Composition of many Comments

                        on comments.escalation = $self;

};

 

view PurchaseOrders as

    select from external.A_PurchaseOrder {

        key PurchaseOrder as ID,

            PurchaseOrderType,

            Supplier,

            SupplierPhoneNumber

    };