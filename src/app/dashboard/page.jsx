import { redirect } from 'next/navigation';
async function getUserRole() {
  return 'recruiter'; 
}

export default async function DashboardPage() {
  const role = await getUserRole();

  if (role === 'recruiter') {
    redirect('/dashboard/recruiter');
  } 
  
  if (role === 'seeker') {
    redirect('/dashboard/seeker');
  }
  redirect('/login');
}