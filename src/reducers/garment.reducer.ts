import { ActionReducer, Action } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';

import { User, ISideMenu } from '../models/user';
import { IGarment } from '../models/garment';
import { Pages } from '../actions/navigation.actions'
import * as _ from 'lodash';

let garmentDetails: any = [{
    id: 1,
    imgUrls: [],
    washInstructions: [
        '',
        '',
        '',
        '',
        '',
    ],
    styleInstructions: [
        '',
        '',
        '',
        '',
    ]
}]
let sideMenu: any = [
    {
        id: 1,
        title: 'DASHBOARD',
        icon: 'icon-dashboard',
        isActive: true,
        pageKey: Pages.LOGIN
    },
    {
        id: 2,
        title: 'TASKS',
        icon: 'icon-tasklist',
        isActive: false,
        pageKey: Pages.LOGIN
    },
    {
        id: 3,
        title: 'APPROVALS',
        icon: 'icon-approvals',
        isActive: false,
        pageKey: Pages.LOGIN
    }
]

export interface IGarmentState {
    garmentDetails: any,
}

const initial: IGarmentState = {
    garmentDetails: [{
        id: 1,
        imgUrls: [],
        washInstructions: [
            'Acetate: Hand Wash — Air Dry.',
            'Cotton: Hot Water Wash — Tumble Dry Warm.',
            'Linen: Cool Water Wash — Air Dry.',
            'Polyester: Cool Water Wash — Tumble Dry Warm or Air Dry.',
            'Silk: Hand Wash or Cool Warm Wash — Tumble Dry Cool or Air Dry.',
        ],
        styleInstructions: [
            'Textile apparel worn to cover or protect the body',
            'Exempt apparel: shoes, gloves and hats',
            'Handkerchiefs, belts, suspenders and necktie',
            'Non-woven garments made for one-time use',
        ]
    },
    {
        id: 2,
        imgUrls: [],
        washInstructions: [
            'Wool: Hand Wash — Air Dry.',
            'Spandex: Hand Wash — Air Dry.',
            'Silk: Hand Wash or Cool Warm Wash — Tumble Dry Cool or Air Dry.',
            'Polyester: Cool Water Wash — Tumble Dry Warm or Air Dry.',
            'Linen: Cool Water Wash — Air Dry.',
        ],
        styleInstructions: [
            'Piece goods sold for making apparel at home',
            'Trim up to five inches wide',
            'provide complete instructions about regular care for the garmen',
            'ensure that, if followed, care labeling instructions will cause no substantial harm to the product',
        ]
    },
    {
        id: 3,
        imgUrls: [],
        washInstructions: [
            'Silk: Hand Wash or Cool Warm Wash — Tumble Dry Cool or Air Dry.',
            'Polyester: Cool Water Wash — Tumble Dry Warm or Air Dry.',
            'Linen: Cool Water Wash — Air Dry.',
        ],
        styleInstructions: [
            'In some cases, experience and industry expertise serve as a reasonable basis',
            'In other cases — for example, if you use a dye that is known to bleed, or beads that are known to be damaged in drycleaning',
            'When a garment contains several components, you must have reliable evidence showing that the entire garment won’t be damaged when cleaned as directed.',
        ]
    },
    {
        id: 4,
        imgUrls: [],
        washInstructions: [
            'Upper garment should be dry cleaned',
            'inner garment can be washed'
        ],
        
        styleInstructions: [
            'In some cases, experience and industry expertise serve as a reasonable basis',
            'In other cases — for example, if you use a dye that is known to bleed, or beads that are known to be damaged in drycleaning',
            'When a garment contains several components, you must have reliable evidence showing that the entire garment won’t be damaged when cleaned as directed.',
        ]
    },
    {
        id: 5,
        imgUrls: [],
        washInstructions: [
            'Silk: Hand Wash or Cool Warm Wash — Tumble Dry Cool or Air Dry.',
            'Polyester: Cool Water Wash — Tumble Dry Warm or Air Dry.',
            'Linen: Cool Water Wash — Air Dry.',
        ],
        styleInstructions: [
            'In some cases, experience and industry expertise serve as a reasonable basis',
            'In other cases — for example, if you use a dye that is known to bleed, or beads that are known to be damaged in drycleaning',
            'When a garment contains several components, you must have reliable evidence showing that the entire garment won’t be damaged when cleaned as directed.',
        ]
    },
    {
        id: 6,
        imgUrls: [],
        washInstructions: [
            'Silk: Hand Wash or Cool Warm Wash — Tumble Dry Cool or Air Dry.',
            'Polyester: Cool Water Wash — Tumble Dry Warm or Air Dry.',
            'Linen: Cool Water Wash — Air Dry.',
        ],
        styleInstructions: [
            'In some cases, experience and industry expertise serve as a reasonable basis',
            'In other cases — for example, if you use a dye that is known to bleed, or beads that are known to be damaged in drycleaning',
            'When a garment contains several components, you must have reliable evidence showing that the entire garment won’t be damaged when cleaned as directed.',
        ]
    },
    {
        id: 7,
        imgUrls: [],
        washInstructions: [
            'Silk: Hand Wash or Cool Warm Wash — Tumble Dry Cool or Air Dry.',
            'Polyester: Cool Water Wash — Tumble Dry Warm or Air Dry.',
            'Linen: Cool Water Wash — Air Dry.',
        ],
        styleInstructions: [
            'In some cases, experience and industry expertise serve as a reasonable basis',
            'In other cases — for example, if you use a dye that is known to bleed, or beads that are known to be damaged in drycleaning',
            'When a garment contains several components, you must have reliable evidence showing that the entire garment won’t be damaged when cleaned as directed.',
        ]
    }]
}

export const GarmentReducer: ActionReducer<IGarmentState> =
    (state: IGarmentState = initial, action: Action) => {
        switch (action.type) {
            case UserActions.USER_AUTH_TYPE:
                return Object.assign({}, state, { LoginType: action.payload });
            default:
                return state;
        };
    };