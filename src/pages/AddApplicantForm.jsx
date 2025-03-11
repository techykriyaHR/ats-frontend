import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import ConfirmationModal from '../components/Modals/ConfirmationModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import useUserStore from '../store/userStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formSchema = {
  firstName: '',
  middleName: '',
  lastName: '',
  birthdate: '',
  gender: '',
  email: '',
  phone: '',
  cvLink: '',
  position: '',
  source: '',
  referrer: '',
  testResult: '',
  dateApplied: '',
};

const duplicates = [
  {
    name: "Juniper Wright Williams",
    dateApplied: "October 24, 2024",
    positionApplied: "Business Operations Associate",
    applicationStatus: "Business Operations Associate",
    emailAddress: "junkyblue@gmail.com",
    similarities: ["First Name", "Last Name", "Email Address"],
  },
  {
    name: "Saturnino Paterno",
    dateApplied: "October 24, 2023",
    positionApplied: "Software Engineer",
    applicationStatus: "Business Operations Associate",
    emailAddress: "satkyblue@gmail.com",
    similarities: ["Email Address"],
  },
];

function AddApplicantForm({ onClose }) {
  const [formData, setFormData] = useState(formSchema);
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/company/positions`);
        setPositions(response.data.positions);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${API_BASE_URL}/user/user-accounts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.userAccounts);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPositions();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        applicant: JSON.stringify({
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            birth_date: formData.birthdate,
            gender: formData.gender,
            email_1: formData.email,
            mobile_number_1: formData.phone,
            cv_link: formData.cvLink,
            discovered_at: formData.source,
            referrer_id: formData.referrer,
            created_by: user.user_id, // Use the logged-in user's ID
            updated_by: user.user_id, // Use the logged-in user's ID
            company_id: 'company_id', // Set dynamically if needed
            position_id: formData.position,
            test_result: formData.testResult,
            date_applied: formData.dateApplied,
        })
    };

    console.log('PAYLOAD:', payload);

    try {
        const response = await axios.post(`${API_BASE_URL}/applicants/add`, payload);
        console.log('Applicant added:', response.data);
        onClose();
    } catch (error) {
        console.error('Error adding applicant:', error);
    }
  };

  const handleCancel = () => {
    setShowConfirmationModal(true);
  };

  const confirmCancel = () => {
    setShowConfirmationModal(false);
    onClose();
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
  };

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const populateRandomData = () => {
    // Generate random names
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Michael', 'Emma', 'David', 'Sophia', 'James', 'Olivia', 'Daniel', 'Emily'];
    const middleInitials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson'];
    
    // Generate random birth year between 1970 and 2000
    const randomYear = Math.floor(Math.random() * 31) + 1970;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1; // Using 28 to avoid date issues
    const birthdate = `${randomYear}-${randomMonth.toString().padStart(2, '0')}-${randomDay.toString().padStart(2, '0')}`;
    
    // Generate random gender with probability distribution
    const genderRoll = Math.random();
    const gender = genderRoll < 0.45 ? 'male' : (genderRoll < 0.9 ? 'female' : 'other');
    
    // Generate random first and last name
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const middleInitial = middleInitials[Math.floor(Math.random() * middleInitials.length)] + '.';
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate random email based on name
    const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com', 'company.net'];
    const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const emailPrefix = Math.random() < 0.5 ? 
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}` : 
      `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
    const email = `${emailPrefix}@${emailDomain}`;
    
    // Generate random phone number
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const lineNumber = Math.floor(Math.random() * 9000) + 1000;
    const phone = `${areaCode}${prefix}${lineNumber}`;
    
    // Generate random CV link
    const cvDomains = ['drive.google.com', 'dropbox.com', 'onedrive.live.com', 'linkedin.com'];
    const cvDomain = cvDomains[Math.floor(Math.random() * cvDomains.length)];
    const cvId = Math.random().toString(36).substring(2, 10);
    const cvLink = `https://${cvDomain}/cv-${cvId}`;
    
    // Generate random application date within the last 2 years
    const now = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(now.getFullYear() - 2);
    const randomDate = new Date(twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime()));
    const dateApplied = randomDate.toISOString().split('T')[0];
    
    // Generate random source with weighted distribution
    const sources = [
      { name: 'Referral', weight: 0.35 },
      { name: 'Website', weight: 0.25 },
      { name: 'LinkedIn', weight: 0.15 },
      { name: 'Indeed', weight: 0.1 },
      { name: 'Social Media', weight: 0.08 },
      { name: 'Podcast', weight: 0.04 },
      { name: 'Job Fair', weight: 0.03 }
    ];
    
    let sourceRoll = Math.random();
    let cumulativeWeight = 0;
    let source = sources[sources.length - 1].name;
    
    for (const sourceOption of sources) {
      cumulativeWeight += sourceOption.weight;
      if (sourceRoll <= cumulativeWeight) {
        source = sourceOption.name;
        break;
      }
    }
    
    // Random position and referrer still use existing data but with random selection
    const position = positions.length > 0 ? positions[Math.floor(Math.random() * positions.length)].job_id : '';
    const referrer = users.length > 0 ? users[Math.floor(Math.random() * users.length)].user_id : '';
    
    // Random test result link
    const testResultId = Math.random().toString(36).substring(2, 12);
    const testResult = `https://results.company.com/test-${testResultId}`;
    
    const randomData = {
      firstName,
      middleName: middleInitial,
      lastName,
      birthdate,
      gender,
      email,
      phone,
      cvLink,
      position,
      source,
      referrer,
      testResult,
      dateApplied,
    };
    
    setFormData(randomData);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 p-4">
          <h1 className="text-xl font-semibold">Add New Applicant</h1>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={populateRandomData}
          >
            Populate Random Data
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-medium">Applicant Name</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col">
                  <label>Birthdate</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <FaCalendarAlt className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label>Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                      />
                      <span>Female</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === 'other'}
                        onChange={handleChange}
                      />
                      <span>Other</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label>Date Applied</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateApplied"
                      value={formData.dateApplied}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <FaCalendarAlt className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Contact Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(XXX) XXX-XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>CV Link</label>
                <input
                  type="url"
                  name="cvLink"
                  placeholder="cv.link@drive.com"
                  value={formData.cvLink}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label>Position Applied</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Option</option>
                  {positions.map((position) => (
                    <option key={position.job_id} value={position.job_id}>
                      {position.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label>Source</label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Option</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Career Fair (Startup Caravan, University Visit)">Career Fair (Startup Caravan, University Visit)</option>
                  </select>
                </div>

                {formData.source === 'Referral' && (
                  <div>
                    <label>Referrer</label>
                    <select
                      name="referrer"
                      value={formData.referrer}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Option</option>
                      {users.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {`${user.first_name} ${user.middle_name} ${user.last_name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label>Test Result</label>
                <input
                  type="url"
                  name="testResult"
                  placeholder="https://testresults.com"
                  value={formData.testResult}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#008080] text-white hover:bg-teal-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-96 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Possible Duplicates ({duplicates.length})</h2>
            </div>
            <div className="space-y-4">
              {duplicates.map((duplicate, index) => (
                <div key={index} className="border p-4 space-y-2">
                  <h3 className="font-medium">{duplicate.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Date Applied: {duplicate.dateApplied}</p>
                    <p>Position Applied: {duplicate.positionApplied}</p>
                    <p>Application Status: {duplicate.applicationStatus}</p>
                    <p>Email Address: {duplicate.emailAddress}</p>
                  </div>
                  <div className="space-y-1 pt-2">
                    {duplicate.similarities.map((similarity, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-yellow-600">
                        <FaExclamationTriangle className="h-4 w-4" />
                        <span>Similarity in {similarity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showConfirmationModal && (
          <ConfirmationModal
            message="Are you sure you want to leave this page? Unsaved changes will be lost."
            onConfirm={confirmCancel}
            onCancel={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default AddApplicantForm;