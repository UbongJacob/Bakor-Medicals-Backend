const initialData = [
  {
    firstName: "John",
    lastName: "Doe",
    specialization: "Obstetrician/Gynecologist",
    email: "john.doe@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "John is a dedicated Obstetrician/Gynecologist, specializing in women's reproductive health. He is passionate about providing quality care to expectant mothers and women in all stages of life.",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    specialization: "Pediatrician",
    email: "jane.smith@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Jane is a compassionate Pediatrician, committed to the well-being of children. She loves working with young patients, ensuring their growth and development are on track.",
  },
  {
    firstName: "David",
    lastName: "Johnson",
    specialization: "General surgeon",
    email: "david.johnson@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "David is a skilled General Surgeon known for his expertise in surgical procedures. He's committed to improving patients' lives through surgical interventions.",
  },
  {
    firstName: "Sarah",
    lastName: "Brown",
    specialization: "Orthopedic surgeon",
    email: "sarah.brown@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Sarah is a talented Orthopedic Surgeon, specializing in bone and joint health. Her surgical skills and patient care have made her a trusted professional in her field.",
  },
  {
    firstName: "Michael",
    lastName: "Wilson",
    specialization: "Cardiologist",
    email: "michael.wilson@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "Michael is a Cardiologist who excels in cardiovascular care. He's dedicated to preventing heart diseases and providing top-notch treatment for patients.",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    specialization: "Endocrinologist",
    email: "emily.davis@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Emily is an Endocrinologist focusing on hormonal health. Her in-depth knowledge helps patients manage conditions like diabetes and thyroid disorders effectively.",
  },
  {
    firstName: "Robert",
    lastName: "Taylor",
    specialization: "General Practitioner",
    email: "robert.taylor@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "Robert is a General Practitioner known for his holistic approach to healthcare. He provides comprehensive medical services to his patients.",
  },
  {
    firstName: "Laura",
    lastName: "Johnson",
    specialization: "Neurologist",
    email: "laura.johnson@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Laura is a skilled Neurologist specializing in disorders of the nervous system. Her expertise helps patients manage conditions like epilepsy and migraines.",
  },
  {
    firstName: "Samuel",
    lastName: "White",
    specialization: "Gastroenterologist",
    email: "samuel.white@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "Samuel is a Gastroenterologist, specializing in digestive health. He's dedicated to diagnosing and treating gastrointestinal disorders.",
  },
  {
    firstName: "Grace",
    lastName: "Okafor",
    specialization: "Nephrologist",
    email: "grace.okafor@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Grace is a Nephrologist, focusing on kidney health. She's passionate about helping patients with kidney diseases and ensuring their well-being.",
  },
  {
    firstName: "Mark",
    lastName: "Adeyemi",
    specialization: "Dermatologist",
    email: "mark.adeyemi@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "Mark is a Dermatologist known for his expertise in skin health. He provides solutions for various dermatological issues, from acne to skin cancer.",
  },
  {
    firstName: "Angela",
    lastName: "Okonkwo",
    specialization: "Psychiatrist",
    email: "angela.okonkwo@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Angela is a compassionate Psychiatrist who specializes in mental health. She offers support and treatment to individuals with emotional and psychological challenges.",
  },
  {
    firstName: "Peter",
    lastName: "Eze",
    specialization: "Urologist",
    email: "peter.eze@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "Peter is a Urologist focusing on urological health. He provides expert care for patients with urinary and reproductive system issues.",
  },
  {
    firstName: "Grace",
    lastName: "Nwosu",
    specialization: "Ophthalmologist",
    email: "grace.nwosu@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Grace is an Ophthalmologist with a focus on eye health. She's dedicated to preserving and improving patients' vision.",
  },
  {
    firstName: "James",
    lastName: "Ogunwale",
    specialization: "ENT surgeon",
    email: "james.ogunwale@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "James is a skilled ENT (Ear, Nose, and Throat) Surgeon. He offers surgical solutions for conditions affecting the head and neck.",
  },
  {
    firstName: "Susan",
    lastName: "Adewale",
    specialization: "Therapist",
    email: "susan.adewale@gmail.com",
    password: "password",
    isAvailable: false,
    gender: "Female",
    description:
      "Susan is a dedicated Therapist who provides mental health support and counseling to help individuals cope with life's challenges.",
  },
  {
    firstName: "Alex",
    lastName: "Nnamdi",
    specialization: "Dental Specialization",
    email: "alex.nnamdi@gmail.com",
    password: "password",
    isAvailable: true,
    gender: "Male",
    description:
      "Alex is a Dental Specialist, known for his expertise in oral health. He offers a wide range of dental services, ensuring patients' smiles are healthy and bright.",
  },
];

function generateNigerianPhoneNumber() {
  const phoneNumber =
    "+234" + Math.floor(1000000000 + Math.random() * 9000000000);
  return phoneNumber;
}

const doctorsDummyData = initialData.map((data) => ({
  ...data,
  phoneNumber: generateNigerianPhoneNumber(),
}));

export default doctorsDummyData;
