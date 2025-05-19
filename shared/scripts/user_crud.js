let globalUsers = [];
let currentUser;

async function setUsers() {
    let userBusinessResp = await getData(BUSINESS_PROFILES_URL);
    if (userBusinessResp.ok) {
        let cleanResponse = transformApiResponse(userBusinessResp.data)
        globalUsers = globalUsers.concat(cleanResponse);
    }

    let userCustomerResp = await getData(CUSTOMER_PROFILES_URL);
    if (userCustomerResp.ok) {
        let cleanResponse = transformApiResponse(userCustomerResp.data)
        globalUsers = globalUsers.concat(cleanResponse);
    }
}

function transformApiResponse(apiResponse) {
    return apiResponse.map(item => {
        if (typeof item.user === 'number') {
            return {
                // user: {
                pk: item.user,
                username: item.username,
                first_name: item.first_name,
                last_name: item.last_name,
                // },
                email: item.email,
                created_at: item.created_at,
                file: item.file,
                location: item.location,
                tel: item.tel,
                description: item.description,
                working_hours: item.working_hours,
                type: item.type
            };
        }
        return item;
    });
}

function getUserInfo(id) {
    return globalUsers.find(user => user.pk === id) || null
}

async function setCurrentUser() {
    if (getAuthUserId()) {
        let response = await getData(PROFILE_URL + getAuthUserId() + "/");

        console.log("inside setCurrentUser response.data is:", response.data);

        if (response.ok) {
            currentUser = response.data;
        } else {
            showToastMessage(true, ['Eigene User konnte nicht gefunden werden'])
        }
        return response;
    }
    return { ok: false }
}