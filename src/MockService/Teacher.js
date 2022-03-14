export const getTeacher = () => {
    return Promise.resolve({
        data: {
            output: [{
                "Profile_pic": "https://picsum.photos/200", 
                "Qualification": [], 
                "About": "test",
                "Certification": [],
                "DOB": "2020-06-11",
                "District": "Kochi",
                "Email": "danush@gmail.com",
                "Experience": [],
                "First_name": "danush",
                "Gender": "Male",
                "Last_name": "kumar",
                "Pass": "demo@123",
                "Phone_Number": 1234567890,
                "Pin": 123456,
                "Resume": "",
                "State": "Tamil Nadu",
                "Street": "street",
                "Training_from_campus": [],
                "Transactions": [],
                "address": "address",
                "applied_jobs": [],
                "city": "city",
                "status": true,
                "type": "teacher",
                "__v": 0,
                "_id": "5eee347d6926b907adfeee00",
                "isSkip": false,
                "isFresher": true,
                "isSubScribed": false
            }],
            error_code: 1
        }
    })
}

export const getJobResponse = () => {
    return Promise.resolve({
        data: [{
            result: "selected",
            interview_date: "date",
            instituion_name: "instiution name",
            time: "time",
            contact: "123456789"
        },
        {
            result: "rejected",
            interview_date: "",
            instituion_name: "instiution name",
            time: "",
            contact: "1234567890"
        }]
    })
}


export const getNews = () => {
    return Promise.resolve({
        data: [{
            title: "selected",
            description: "123456789"
        },
        {
            title: "rejected",
            description: "this is some news",
        }]
    })
}