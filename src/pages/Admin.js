
import React, { useEffect, useState } from 'react';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import MaterialTable from '@material-table/core';
import { CModal,CButton,CModalHeader,CModalTitle,CModalBody,CModalFooter } from '@coreui/react';
import { ExportCsv,ExportPdf } from '@material-table/exporters';

import '../styles/admin.css';
import {fetchTickets,updateTickets} from '../api/ticket'
import Sidebar from '../components/Sidebar';

function Admin() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [visible, setVisible] = useState(false);
  
  //ticket list hook
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});

  //hook for counting ticket status
  const [ticketCount, setTicketCount] = useState({});

  
  

  useEffect(() => {
    (async () => { fetchTicket() })()
  },[])

  const fetchTicket=()=>{
    fetchTickets().then(function (response) {
      if (response.status === 200) {
        console.log(response);
        setTicketDetails(response.data);
        updateTicketCount(response.data);
        }
    }).catch((error) => { console.log(error); })
  }

  
  function saveChanges(e) {
    e.preventDefault();
    updateTickets(selectedCurrTicket.id, selectedCurrTicket)
      .then(function (response) {
        console.log('ticket updated successfully');
      }).catch((error) => {
        console.log(error);
    })
    
  }

  function editTicketDetails(ticketDetails) {
    const ticket = {
      assignee: ticketDetails.assignee,
      description:ticketDetails.description,
      id: ticketDetails.id,
      reporter: ticketDetails.reporter,
      status:ticketDetails.status,
      ticketPriority: ticketDetails.ticketPriority,
      title: ticketDetails.title
    }
    console.log(ticket);
    //store the existing values of rowdata grabbed in a state.
    // ticket object created above will be stored in a state variable
    // called selectedCurrTicket
    setSelectedCurrTicket(ticket);

  }
  // updates the selected current ticket data.
  const updateSelectedCurrentTicket = (data) => { setSelectedCurrTicket(data); }

  //function for reading existing data from ticketDetails(rowData) and display it
  // into the modal.
  function onTicketUpdate(e) {
    //check the input value of modal with name given to it 
    if (e.target.name === 'title') {
      //grab the value from text input of modal and 
      //store it in state variable object and repeat this for all input of modal.
      selectedCurrTicket.title = e.target.value;
    }
    else if (e.target.name === 'description') {
      selectedCurrTicket.description = e.target.value;
    }
    else if (e.target.name === 'ticketPriority') {
      selectedCurrTicket.ticketPriority = e.target.value;
    }
     else if (e.target.name === 'assignee') {
      selectedCurrTicket.assignee = e.target.value;
    }
    else if (e.target.name === 'status') {
      selectedCurrTicket.status = e.target.value;
    }
    //assign this updated ticket details to a new object
    //object.assign()=>it creates new object with new values.
    //(target,source)=> target :new values,source:destination where you want to update values
    updateSelectedCurrentTicket(Object.assign({},selectedCurrTicket))
    
  }
  // function for displaying tickets count according to status
  const updateTicketCount = (tickets) => {
    const data = {
      in_progress: 0,
      closed: 0,
      open: 0,
      blocked:0
    }
    tickets.forEach((item) => {
      if (item.status === 'OPEN') {
        data.open += 1;
      }
      else if (item.status === 'CLOSED') {
        data.closed += 1;
      }
      else if (item.status === 'BLOCKED') {
        data.blocked += 1;
      }
      else if (item.status === 'IN_PROGRESS') {
        data.in_progress += 1;
      }
      
    })
    //store the updated values of count into state variable ticketCount.
    setTicketCount(Object.assign({}, data)); 
  }
   console.log(ticketCount);
  return (
    <div className='bg-light vh-100'>
      <div className='row'>
        <div className='col-1'>
            <Sidebar/>
        </div>

      </div>
      <div className='container col'>
        <h2 className='text-primary text-center '>Welcome Admin</h2>
        <p className='text-muted text-center'>Take a quick look at your stats below</p>
        <div className='row my-5 mx-5 text-center'>
          {/* 4 widgets for displaying count of tickets according to status */}
          <div className='col my-1'>
            <div className='card shadow bg-primary bg-opacity-25'
            style={{width:12+'rem'}}>
              <div className='cardbody border-b'>
                <h5 className='card-subtitle'>
                  <i className='bi bi-pen text-primary mx-2 my-2'></i>
                  OPEN
                </h5>
                <hr />
                <div className='row'>
                  <div className='col' style={{ height: '40px', widht: '40px', margin: '10px' }}>
                    {ticketCount.open}
                  </div>
                  <div className='col'>
                    <div>
                      <CircularProgressbar value={ticketCount.open} styles={buildStyles(
                        { textColor: 'blue', pathColor: 'darkBlue' })}>

                      </CircularProgressbar>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

           <div className='col my-1'>
            <div className='card shadow bg-warning bg-opacity-25'
            style={{width:12+'rem'}}>
              <div className='cardbody border-w'>
                <h5 className='card-subtitle'>
                  <i className='bi bi-lightning-charge text-warning mx-2 my-2'></i>
                  PROGRESS
                </h5>
                <hr />
                <div className='row'>
                  <div className='col' style={{ height: '40px', widht: '40px', margin: '10px' }}>
                    {ticketCount.in_progress}
                  </div>
                  <div className='col'>
                    <div>
                      <CircularProgressbar value={ticketCount.in_progress} styles={buildStyles(
                        { textColor: 'blue', pathColor: 'Gold' })}>

                      </CircularProgressbar>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

           <div className='col my-1'>
            <div className='card shadow bg-success bg-opacity-25'
            style={{width:12+'rem'}}>
              <div className='cardbody border-s'>
                <h5 className='card-subtitle'>
                  <i className='bi bi-check2-circle text-success mx-2 my-2'></i>
                  CLOSED
                </h5>
                <hr />
                <div className='row'>
                  <div className='col' style={{ height: '40px', widht: '40px', margin: '10px' }}>
                    {ticketCount.closed}
                  </div>
                  <div className='col'>
                    <div>
                      <CircularProgressbar value={ticketCount.closed} styles={buildStyles(
                        { textColor: 'blue', pathColor: 'darkGreen' })}>

                      </CircularProgressbar>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

           <div className='col my-1'>
            <div className='card shadow bg-secondary bg-opacity-25'
            style={{width:12+'rem'}}>
              <div className='cardbody border-g'>
                <h5 className='card-subtitle'>
                  <i className='bi bi-slash-circle text-primary mx-2 my-2'></i>
                    BLOCKED
                </h5>
                <hr />
                <div className='row'>
                  <div className='col' style={{ height: '40px', widht: '40px', margin: '10px' }}>
                    {ticketCount.blocked}
                  </div>
                  <div className='col'>
                    <div>
                      <CircularProgressbar value={ticketCount.blocked} styles={buildStyles(
                        { textColor: 'blue', pathColor: 'darkGrey' })}>

                      </CircularProgressbar>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
         {/* Material Table for displaying fetched data from API */}
          <div >
          <MaterialTable
            onRowClick={(event, rowData) => { setVisible(!visible); 
              editTicketDetails(rowData);
            }}
            data={ticketDetails}
                columns={[
                { title: 'TicketID', field: 'id' },
                { title: 'Title', field: 'title' },
                  { title: 'Description', field: 'description' },
                  { title: 'Reporter', field: 'reporter' },
                  { title: 'Priority', field: 'ticketPriority' },
                { title: 'Assignee', field: 'assignee'},
                  {
                    title: 'Status', field: 'status',
                    lookup: { 
                      'OPEN': 'OPEN',
                      'IN_PROGRESS': 'IN_PROGRESS',
                      'CLOSED': 'CLOSED',
                      'BLOCKED': 'BLOCKED'
                    }
                  }
                ]}

            options={{

              filtering: true,
              //option for downloading whole table into pdf or csv format
              exportMenu: [{
                label: 'ExportPdf',
                exportFunc:(cols,data)=>ExportPdf(cols,data,'Ticket Records')
              }, {
                label: 'ExportCsv',
                exportFunc:(cols,data)=>ExportCsv(cols,data,'Ticket Records')
                    
                  }],
                  headerStyle: {
                    backgroundColor: 'darkblue',
                    color:'white'
                  }, rowStyle: {
                    backgroundColor:'lavender'
                  }
                }}
              
              title="TICKET RECORDS"
          />
            {/* Modal for showing current values and accepting updated values */}
    <CModal visible={visible} onClose={() => setVisible(false)} backdrop='static'>
      <CModalHeader>
        <CModalTitle>Edit Ticket Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
              <form>
                <div>
                  <h5>Ticket ID:{selectedCurrTicket.id}</h5>
                  <hr/>
                </div>
                <div>
                  Title:<input type='text' name='title'
                    value={selectedCurrTicket.title}
                    onChange={onTicketUpdate}
                     />
                </div>
                <div>
                  Description:<input type='text' name='description'
                    value={selectedCurrTicket.description}
                    onChange={onTicketUpdate}
                     />
                </div>
                <div>
                  Priority:<input type='text'
                    name='ticketPriority'
                    value={selectedCurrTicket.ticketPriority}
                    onChange={onTicketUpdate}
                    />
                </div>
                <div>
                  Assignee:<input type='text'
                    name='assignee'
                    value={selectedCurrTicket.assignee}
                    onChange={onTicketUpdate}
                   />
                </div>
                <div>
                  Status:<input type='text'
                    name='status'
                    value={selectedCurrTicket.status}
                    onChange={onTicketUpdate}
                     />
                </div>

              </form>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={saveChanges}>Save changes</CButton>
      </CModalFooter>
    </CModal>
         
          </div>
      </div>

     
          
    </div>
  )
}

export default Admin