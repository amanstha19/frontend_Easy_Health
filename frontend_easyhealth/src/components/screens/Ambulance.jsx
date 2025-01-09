import React from 'react';

// Sample data for ambulance services
const ambulanceServices = [
  { name: 'Nepal Ambulance Service', contact: '01-4427833,102', location: 'Ghattekulo Marg, Kathmandu' },
  { name: 'Akhil Nepal Chiya Majdur Sangh', contact: '9814952000', location: 'Jhapa' },
  { name: 'Ambulance Lalitpur Municipality', contact: '9841202641,01-5527003', location: 'Pulchowk, Lalitpur' },
  { name: 'Ambulance Service Siddhartha Club', contact: '061530200,061521433', location: 'Siddhartha Chowk, Pokhara' },
  { name: 'Sanjivini Ayurvedic Prakritik Chikitsaylaya', contact: '9848554800', location: 'Chitwan' },
  { name: 'B. P. Smriti Hospital', contact: '9841447710', location: 'Basundhara, Kathmandu' },
  { name: 'Laxmi Run Data Smriti Sewa Samaj', contact: '9804910985', location: 'Birtamod, Jhapa' },
  // Add the rest of the data similarly...
];

const AmbulanceList = () => {
  return (
    <div>
      <h1>Ambulance Services in Nepal</h1>
      <ul>
        {ambulanceServices.map((service, index) => (
          <li 
            key={index} 
            style={{
              border: '1px solid #ccc', 
              padding: '10px', 
              marginBottom: '10px', 
              backgroundColor: '#d4f7d4',  // Lighter green shade
              borderRadius: '5px'
            }}
          >
            <strong>{service.name}</strong><br />
            Contact: {service.contact}<br />
            Location: {service.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

function Ambulance() {
  return (
    <div>
      <h2>Ambulance Service Page</h2>
      <p>Welcome to the ambulance service. Please call for assistance.</p>
      <AmbulanceList />
    </div>
  );
}

export default Ambulance;
