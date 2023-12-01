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
      "Fairness": 72,
      "Robustness": 73,
      "Date": "05-Oct-21"
  },
  {
      "Fairness": 73,
      "Robustness": 72,
      "Date": "23-Oct-21"
  },
  {
      "Fairness": 70,
      "Robustness": 75,
      "Date": "15-Nov-21"
  }
  ],
  bigStat: [
    {
      product: "Fairness",
      date:"25-OCT-23",
      total_risk:"2",
      High_Risks:"1",
      value_d:"66%",
      Medium_Risks:"1",
      graphData:[{value:"60",date:"10/10"},{value:"65",date:"15/10"},{value:"66",date:"25/10"}],
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
      product: "Accuracy",
      date:"10-OCT-23",
      total_risk:"3",
      High_Risks:"2",
      graphData:[{value:"67",date:"1/10"},{value:"72",date:"5/10"},{value:"74.35",date:"25/10"}],
      Medium_Risks:"1",
      value_d:"74.35%",
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
      product: "Metrics At High Risks",
      date:"25-OCT-23",
      total_risk:"1",
      High_Risks:"1",
      value_d:"5",
      graphData:[{value:"7",date:"10/10"},{value:"9",date:"12/10"},{value:"5",date:"25/10"}],
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
  bigStat_fraud: [
    {
      product: "Fairness",
      date:"25-OCT-23",
      total_risk:"2",
      High_Risks:"1",
      value_d:"83.3%",
      Medium_Risks:"1",
      graphData:[{value:"73.3",date:"03/01"},{value:"76.8",date:"15/01"},{value:"83.3",date:"25/01"}],
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
      product: "Accuracy",
      date:"10-OCT-23",
      total_risk:"3",
      High_Risks:"1",
      graphData:[{value:"65",date:"1/02"},{value:"62",date:"5/02"},{value:"64",date:"10/02"}],
      Medium_Risks:"2",
      value_d:"64%",
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
      product: "Metrics At High Risks",
      date:"25-OCT-23",
      total_risk:"1",
      High_Risks:"0",
      value_d:"4",
      graphData:[{value:"7",date:"03/02"},{value:"10",date:"11/02"},{value:"4",date:"25/02"}],
      Medium_Risks:"1",
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