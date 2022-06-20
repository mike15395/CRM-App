import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export async function fetchTickets(data) {
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
        headers: {
            'x-access-token':localStorage.getItem('token')
        }
    }, {
        'userId': localStorage.getItem('userId')
    });
    
}

export async function updateTickets(id,selectedCurrTicket) {
    return await axios.put(`${BASE_URL}/crm/api/v1/tickets/${id}`,selectedCurrTicket, {
        headers: {
            'x-access-token':localStorage.getItem('token')//headers
        }
    }, {
        'userId': localStorage.getItem('userId')//body
    });
    
}
