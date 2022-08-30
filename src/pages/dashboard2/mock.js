export default {
  analatics_credit:[
    {
      "Fairness": 68,
      "Robustness": 73,
      "Date": "02-Oct-21"
  },
  {
      "Fairness": 73,
      "Robustness": 68,
      "Date": "25-Oct-21"
  },
  {
      "Fairness": 75,
      "Robustness": 71,
      "Date": "18-Nov-21"
  }
  ],
  analatics_fraud:[
    {
      name: 'Proteins',
      Actual: 4000,
      Recommended:2400,
      DFRS:2500,
      Desired: 2400,
      amt: 2400,
    },
    {
      name: 'Grains',
      Actual: 3000,
      Desired: 1398,
      Recommended:1398,
      DFRS:2210,
      amt: 2210,
    },
    {
      name: 'Vegetables',
      Actual: 2000,
      Desired: 9800,
      Recommended:2000,
      DFRS:2290,
      amt: 2290,
    },
    {
      name: 'Fruits',
      Actual: 2780,
      Desired: 3908,
      Recommended:2780,
      DFRS:2000,
      amt: 2000,
    },
    {
      name: 'Dairy',
      Actual: 1890,
      Desired: 4800,
      Recommended:1890,
      DFRS:2181,
      amt: 2181,
    }
  ],
  bigStat_fraud: [
    {
      product: "Health",
      date:"18-Nov-21",
      total_risk:"3",
      High_Risks:"2",
      graphData:[{value:"70.5",date:"10/02"},{value:"71.5",date:"10/25"},{value:"68.53",date:"11/18"}],
      Medium_Risks:"1",
      value_d:"68.53",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: "Wellness",
      date:"18-Nov-21",
      total_risk:"2",
      High_Risks:"1",
      value_d:"66",
      Medium_Risks:"1",
      graphData:[{value:"60",date:"10/02"},{value:"65",date:"10/25"},{value:"66",date:"11/18"}],
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: false },
        daily: { value: 3.25, profit: false }
      }
    },
    {
      product: "Condition",
      date:"18-Nov-21",
      total_risk:"1",
      High_Risks:"1",
      value_d:"71",
      graphData:[{value:"73",date:"10/02"},{value:"78",date:"10/25"},{value:"71",date:"11/18"}],
      Medium_Risks:"0",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 32, profit: false },
        weekly: { value: 8, profit: false },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: false },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    }
  ],
  bigStat: [
    {
      product: "Overall",
      date:"18-Nov-21",
      total_risk:"3",
      High_Risks:"2",
      graphData:[{value:"78",date:"10/02"},{value:"78.5",date:"10/25"},{value:"83",date:"11/18"}],
      Medium_Risks:"1",
      value_d:"83",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: "Fairness",
      date:"18-Nov-21",
      total_risk:"1",
      High_Risks:"0",
      value_d:"91.07",
      Medium_Risks:"1",
      graphData:[{value:"83",date:"10/05"},{value:"85",date:"10/23"},{value:"91.07",date:"11/15"}],
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: false },
        daily: { value: 3.25, profit: false }
      }
    },
    {
      product: "Robustness",
      date:"18-Nov-21",
      total_risk:"2",
      High_Risks:"2",
      value_d:"75",
      graphData:[{value:"73",date:"10/02"},{value:"72",date:"10/20"},{value:"75",date:"10/25"}],
      Medium_Risks:"0",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 32, profit: false },
        weekly: { value: 8, profit: false },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: false },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    }
  ],

};