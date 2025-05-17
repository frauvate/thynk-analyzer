export const templates = [
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=300',
    isPremium: false,
    fontFamily: 'Poppins',
    primaryColor: '#a066cb',
    secondaryColor: '#1836b2',
    layout: 'sidebar'
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300',
    isPremium: false,
    fontFamily: 'Inter',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    layout: 'classic'
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: 'https://images.pexels.com/photos/8867538/pexels-photo-8867538.jpeg?auto=compress&cs=tinysrgb&w=300',
    isPremium: true,
    fontFamily: 'Space Grotesk',
    primaryColor: '#ae85ff',
    secondaryColor: '#86c7ed',
    layout: 'modern'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: 'https://images.pexels.com/photos/8867392/pexels-photo-8867392.jpeg?auto=compress&cs=tinysrgb&w=300',
    isPremium: false,
    fontFamily: 'DM Sans',
    primaryColor: '#374151',
    secondaryColor: '#6b7280',
    layout: 'minimal'
  },
  {
    id: 'executive',
    name: 'Executive',
    thumbnail: 'https://images.pexels.com/photos/8867464/pexels-photo-8867464.jpeg?auto=compress&cs=tinysrgb&w=300',
    isPremium: true,
    fontFamily: 'Playfair Display',
    primaryColor: '#1e293b',
    secondaryColor: '#475569',
    layout: 'executive'
  }
];

export const initialCVData = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    summary: '',
    linkedin: '',
    website: ''
  },
  experience: [
    {
      id: '1',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  education: [
    {
      id: '1',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  skills: {
    professional: [
      { id: '1', name: '', level: 3 }
    ],
    languages: [
      { id: '1', name: '', level: 3 }
    ]
  }
};