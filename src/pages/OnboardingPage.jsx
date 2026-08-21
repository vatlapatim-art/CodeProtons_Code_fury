import { useNavigate } from 'react-router-dom'
import Onboarding from '../components/Onboarding.jsx'

function OnboardingPage() {
  const navigate = useNavigate()
  return (
    <main className="onboarding-page">
      <div className="onboarding-page-back"><span>✦ Arthiq</span><span>Build your money profile</span></div>
      <Onboarding onClose={() => navigate('/dashboard', { replace: true })} />
    </main>
  )
}

export default OnboardingPage
