import { useState } from 'react'
import { Icon } from '../components/SailIcons'

const navItems = [
  { name: 'Home', icon: 'home' },
  { name: 'Balances', icon: 'balance' },
  { name: 'Transactions', icon: 'list' },
  { name: 'Customers', icon: 'customers' },
  { name: 'Product catalog', icon: 'product' },
]

const shortcuts = [
  { name: 'Global payouts', icon: 'send' },
]

const payouts = [
  { amount: '$44,792.05', status: 'In transit', statusColor: 'blue', from: 'Payments balance', to: 'Wells Fargo Bank', date: 'Sep 26' },
  { amount: '$51,802.50', status: 'Paid', statusColor: 'green', from: 'Payments balance', to: 'Wells Fargo Bank', date: 'Sep 25' },
  { amount: '$81,771.20', status: 'Paid', statusColor: 'green', from: 'Payments balance', to: 'Wells Fargo Bank', date: 'Sep 24' },
  { amount: '$36,515.95', status: 'Paid', statusColor: 'green', from: 'Payments balance', to: 'Wells Fargo Bank', date: 'Sep 24' },
  { amount: '$44,535.49', status: 'Paid', statusColor: 'green', from: 'Payments balance', to: 'Wells Fargo Bank', date: 'Sep 24' },
]

const upcoming = [
  { month: 'SEP', day: '29', amount: '$29,953.65', description: 'Incoming → Payments balance' },
  { month: 'SEP', day: '30', amount: '$44,792.05', description: 'Payments balance → External bank...' },
]

const resources = [
  { name: 'Manage cards', icon: 'card' },
  { name: 'Manage recipients', icon: 'customers' },
  { name: 'Manage accounting integration', icon: 'apps' },
  { name: 'Balance summary report', icon: 'document' },
  { name: 'Financial account report', icon: 'financialAccount' },
]

const recipients = [
  { name: 'Albert Chin', email: 'albertc@company.com' },
  { name: 'Lulu Siegel', email: 'lulu@sample.com' },
  { name: 'Bianca Silverstein', email: 'bianca@sample.com' },
  { name: 'Bradley Copperfield', email: 'bradleycop@company.com' },
  { name: 'Clay Thompson', email: 'cthom@sample.com' },
  { name: 'Diana Prince', email: 'diana@company.com' },
]

export default function Home() {
  const [currentPage, setCurrentPage] = useState('balances') // 'balances' | 'global-payouts'
  const [showSendModal, setShowSendModal] = useState(false)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [modalStep, setModalStep] = useState('choose-recipient') // 'choose-recipient' | 'add-recipient' | 'business-type' | 'bank-details' | 'confirm' | 'repeat-config' | 'summary'
  const [selectedMethod, setSelectedMethod] = useState(null) // 'email' | 'ach' | 'wire'
  const [recipientEmail, setRecipientEmail] = useState('')
  const [businessType, setBusinessType] = useState(null) // 'individual' | 'company'
  const [showBusinessTypeDropdown, setShowBusinessTypeDropdown] = useState(false)
  const [legalFirstName, setLegalFirstName] = useState('')
  const [legalLastName, setLegalLastName] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('')
  const [payoutAmount, setPayoutAmount] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [isCalendarClosing, setIsCalendarClosing] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear())
  const [calendarSlideDirection, setCalendarSlideDirection] = useState(null)
  const [repeatPayout, setRepeatPayout] = useState(false)
  const [notifyRecipient, setNotifyRecipient] = useState(false)
  const [isPayrollPayment, setIsPayrollPayment] = useState(false)
  const [internalNote, setInternalNote] = useState('')
  const [statementDescriptor, setStatementDescriptor] = useState('')
  const [selectedCadence, setSelectedCadence] = useState(null)
  const [showCadenceDropdown, setShowCadenceDropdown] = useState(false)
  const [customCadence, setCustomCadence] = useState(false)
  const [isCustomCadenceClosing, setIsCustomCadenceClosing] = useState(false)
  const [repeatEveryNumber, setRepeatEveryNumber] = useState('1')
  const [repeatEveryPeriod, setRepeatEveryPeriod] = useState('Weeks')
  const [showRepeatNumberDropdown, setShowRepeatNumberDropdown] = useState(false)
  const [showRepeatPeriodDropdown, setShowRepeatPeriodDropdown] = useState(false)
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([])
  const [lastInstanceDate, setLastInstanceDate] = useState(null)
  const [showFirstInstanceCalendar, setShowFirstInstanceCalendar] = useState(false)
  const [isFirstInstanceCalendarClosing, setIsFirstInstanceCalendarClosing] = useState(false)
  const [firstInstanceCalendarMonth, setFirstInstanceCalendarMonth] = useState(new Date().getMonth())
  const [firstInstanceCalendarYear, setFirstInstanceCalendarYear] = useState(new Date().getFullYear())
  const [showLastInstanceCalendar, setShowLastInstanceCalendar] = useState(false)
  const [isLastInstanceCalendarClosing, setIsLastInstanceCalendarClosing] = useState(false)
  const [lastInstanceCalendarMonth, setLastInstanceCalendarMonth] = useState(new Date().getMonth())
  const [lastInstanceCalendarYear, setLastInstanceCalendarYear] = useState(new Date().getFullYear())
  const [showPayoutDetails, setShowPayoutDetails] = useState(false)
  const [payoutDetails, setPayoutDetails] = useState(null)
  const [globalPayoutsTab, setGlobalPayoutsTab] = useState('overview') // 'overview' | 'payouts-to-recipients' | 'recipients' | 'repeating'
  const [payoutsFilter, setPayoutsFilter] = useState('Scheduled')
  const [recipientsFilter, setRecipientsFilter] = useState('all') // 'all' | 'needs-action' | 'rejected'
  const [selectedRepeatingPayout, setSelectedRepeatingPayout] = useState(null)
  const [scheduledPayouts, setScheduledPayouts] = useState([])
  const [isExistingRecipient, setIsExistingRecipient] = useState(false)
  const [selectedRecipientName, setSelectedRecipientName] = useState('')

  const resetModalForm = () => {
    setModalStep('choose-recipient')
    setSelectedMethod(null)
    setRecipientEmail('')
    setBusinessType(null)
    setShowBusinessTypeDropdown(false)
    setLegalFirstName('')
    setLegalLastName('')
    setRoutingNumber('')
    setAccountNumber('')
    setConfirmAccountNumber('')
    setPayoutAmount('')
    setShowCalendar(false)
    setIsCalendarClosing(false)
    setSelectedDate(new Date())
    setCalendarMonth(new Date().getMonth())
    setCalendarYear(new Date().getFullYear())
    setCalendarSlideDirection(null)
    setRepeatPayout(false)
    setNotifyRecipient(false)
    setIsPayrollPayment(false)
    setInternalNote('')
    setStatementDescriptor('')
    setSelectedCadence(null)
    setShowCadenceDropdown(false)
    setCustomCadence(false)
    setIsCustomCadenceClosing(false)
    setRepeatEveryNumber('1')
    setRepeatEveryPeriod('Weeks')
    setShowRepeatNumberDropdown(false)
    setShowRepeatPeriodDropdown(false)
    setSelectedDaysOfWeek([])
    setLastInstanceDate(null)
    setShowFirstInstanceCalendar(false)
    setIsFirstInstanceCalendarClosing(false)
    setFirstInstanceCalendarMonth(new Date().getMonth())
    setFirstInstanceCalendarYear(new Date().getFullYear())
    setShowLastInstanceCalendar(false)
    setIsLastInstanceCalendarClosing(false)
    setLastInstanceCalendarMonth(new Date().getMonth())
    setLastInstanceCalendarYear(new Date().getFullYear())
    setIsExistingRecipient(false)
    setSelectedRecipientName('')
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const canContinue = isValidEmail(recipientEmail) && selectedMethod !== null

  const canContinueBusinessType = businessType !== null && (
    businessType === 'company' ||
    (businessType === 'individual' && legalFirstName.trim() !== '' && legalLastName.trim() !== '')
  )

  const canContinueBankDetails = routingNumber.trim() !== '' &&
    accountNumber.trim() !== '' &&
    confirmAccountNumber.trim() !== ''

  const canContinueConfirm = payoutAmount.trim() !== '' && parseFloat(payoutAmount) > 0

  const getFee = () => {
    if (selectedMethod === 'email') return 1.00
    if (selectedMethod === 'ach') return 7.50
    if (selectedMethod === 'wire') return 10.00
    return 0
  }

  const getPayoutAmountNum = () => parseFloat(payoutAmount) || 0
  const getTotalPay = () => getPayoutAmountNum() + getFee()

  const formatCurrency = (num) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Convert Sunday=0 to Monday=0 format
  }

  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && calendarMonth === today.getMonth() && calendarYear === today.getFullYear()
  }

  const isSelected = (day) => {
    return day === selectedDate.getDate() && calendarMonth === selectedDate.getMonth() && calendarYear === selectedDate.getFullYear()
  }

  const isPastDay = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(calendarYear, calendarMonth, day)
    return checkDate < today
  }

  const closeCalendar = () => {
    setIsCalendarClosing(true)
    setTimeout(() => {
      setShowCalendar(false)
      setIsCalendarClosing(false)
    }, 150)
  }

  const handleDateSelect = (day) => {
    setSelectedDate(new Date(calendarYear, calendarMonth, day))
    closeCalendar()
  }

  const prevMonth = () => {
    setCalendarSlideDirection('right')
    setTimeout(() => {
      if (calendarMonth === 0) {
        setCalendarMonth(11)
        setCalendarYear(calendarYear - 1)
      } else {
        setCalendarMonth(calendarMonth - 1)
      }
      setCalendarSlideDirection(null)
    }, 10)
  }

  const nextMonth = () => {
    setCalendarSlideDirection('left')
    setTimeout(() => {
      if (calendarMonth === 11) {
        setCalendarMonth(0)
        setCalendarYear(calendarYear + 1)
      } else {
        setCalendarMonth(calendarMonth + 1)
      }
      setCalendarSlideDirection(null)
    }, 10)
  }

  const formatSelectedDate = () => {
    const today = new Date()
    if (selectedDate.toDateString() === today.toDateString()) {
      return 'Today'
    }
    return selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // First instance calendar helpers
  const closeFirstInstanceCalendar = () => {
    setIsFirstInstanceCalendarClosing(true)
    setTimeout(() => {
      setShowFirstInstanceCalendar(false)
      setIsFirstInstanceCalendarClosing(false)
    }, 150)
  }

  const handleFirstInstanceDateSelect = (day) => {
    setSelectedDate(new Date(firstInstanceCalendarYear, firstInstanceCalendarMonth, day))
    // Reset last instance date if it's before the new first instance
    if (lastInstanceDate && lastInstanceDate < new Date(firstInstanceCalendarYear, firstInstanceCalendarMonth, day)) {
      setLastInstanceDate(null)
    }
    closeFirstInstanceCalendar()
  }

  const prevFirstInstanceMonth = () => {
    if (firstInstanceCalendarMonth === 0) {
      setFirstInstanceCalendarMonth(11)
      setFirstInstanceCalendarYear(firstInstanceCalendarYear - 1)
    } else {
      setFirstInstanceCalendarMonth(firstInstanceCalendarMonth - 1)
    }
  }

  const nextFirstInstanceMonth = () => {
    if (firstInstanceCalendarMonth === 11) {
      setFirstInstanceCalendarMonth(0)
      setFirstInstanceCalendarYear(firstInstanceCalendarYear + 1)
    } else {
      setFirstInstanceCalendarMonth(firstInstanceCalendarMonth + 1)
    }
  }

  const isFirstInstancePastDay = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(firstInstanceCalendarYear, firstInstanceCalendarMonth, day)
    return checkDate < today
  }

  const isFirstInstanceSelected = (day) => {
    return day === selectedDate.getDate() && firstInstanceCalendarMonth === selectedDate.getMonth() && firstInstanceCalendarYear === selectedDate.getFullYear()
  }

  const isFirstInstanceToday = (day) => {
    const today = new Date()
    return day === today.getDate() && firstInstanceCalendarMonth === today.getMonth() && firstInstanceCalendarYear === today.getFullYear()
  }

  // Last instance calendar helpers
  const closeLastInstanceCalendar = () => {
    setIsLastInstanceCalendarClosing(true)
    setTimeout(() => {
      setShowLastInstanceCalendar(false)
      setIsLastInstanceCalendarClosing(false)
    }, 150)
  }

  const handleLastInstanceDateSelect = (day) => {
    setLastInstanceDate(new Date(lastInstanceCalendarYear, lastInstanceCalendarMonth, day))
    closeLastInstanceCalendar()
  }

  const prevLastInstanceMonth = () => {
    if (lastInstanceCalendarMonth === 0) {
      setLastInstanceCalendarMonth(11)
      setLastInstanceCalendarYear(lastInstanceCalendarYear - 1)
    } else {
      setLastInstanceCalendarMonth(lastInstanceCalendarMonth - 1)
    }
  }

  const nextLastInstanceMonth = () => {
    if (lastInstanceCalendarMonth === 11) {
      setLastInstanceCalendarMonth(0)
      setLastInstanceCalendarYear(lastInstanceCalendarYear + 1)
    } else {
      setLastInstanceCalendarMonth(lastInstanceCalendarMonth + 1)
    }
  }

  const isLastInstanceDisabledDay = (day) => {
    const checkDate = new Date(lastInstanceCalendarYear, lastInstanceCalendarMonth, day)
    checkDate.setHours(0, 0, 0, 0)
    const firstInstance = new Date(selectedDate)
    firstInstance.setHours(0, 0, 0, 0)
    return checkDate <= firstInstance
  }

  const isLastInstanceSelected = (day) => {
    if (!lastInstanceDate) return false
    return day === lastInstanceDate.getDate() && lastInstanceCalendarMonth === lastInstanceDate.getMonth() && lastInstanceCalendarYear === lastInstanceDate.getFullYear()
  }

  const isLastInstanceCurrentMonth = () => {
    return lastInstanceCalendarMonth === selectedDate.getMonth() && lastInstanceCalendarYear === selectedDate.getFullYear()
  }

  const closeSendModal = () => {
    setIsModalClosing(true)
    setTimeout(() => {
      setShowSendModal(false)
      setIsModalClosing(false)
      resetModalForm()
      document.body.style.overflow = ''
    }, 200)
  }

  const createScheduledPayout = () => {
    const newPayout = {
      id: `po_${Date.now()}`,
      amount: getPayoutAmountNum(),
      recipientName: isExistingRecipient ? selectedRecipientName : businessType === 'individual' ? `${legalFirstName} ${legalLastName}` : 'Cosmo Kramer',
      recipientEmail: recipientEmail || 'jbrealey@stripe.com',
      method: selectedMethod,
      status: 'Scheduled',
      initiatesOn: new Date(selectedDate),
      accountLast4: accountNumber.slice(-4) || '1234',
      fee: getFee(),
      internalNote: internalNote,
      statementDescriptor: statementDescriptor,
      isRepeating: repeatPayout,
      cadence: selectedCadence,
      endsOn: lastInstanceDate
    }
    setScheduledPayouts([newPayout, ...scheduledPayouts])
  }

  const openSendModal = () => {
    setShowSendModal(true)
    setModalStep('choose-recipient')
    document.body.style.overflow = 'hidden'
  }
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="font-semibold text-gray-900">Galtee Insurance</span>
          <Icon name="chevronDown" size="small" fill="#6b7280" />
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isDisabled = ['Home', 'Transactions', 'Customers', 'Product catalog'].includes(item.name)
              const isActive = item.name === 'Balances' && currentPage === 'balances' && !showPayoutDetails
              return (
                <li key={item.name}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (isDisabled) return
                      if (item.name === 'Balances') {
                        setCurrentPage('balances')
                        setShowPayoutDetails(false)
                      }
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      isDisabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : isActive
                          ? 'text-indigo-600 bg-indigo-50 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={item.icon} size="small" fill={isDisabled ? '#d1d5db' : isActive ? '#4f46e5' : '#6b7280'} />
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Shortcuts */}
          <div className="mt-6">
            <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Shortcuts</h3>
            <ul className="mt-2 space-y-1">
              {shortcuts.map((item) => {
                const isActive = item.name === 'Global payouts' && (currentPage === 'global-payouts' || showPayoutDetails)
                return (
                  <li key={item.name}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (item.name === 'Global payouts') {
                          setCurrentPage('global-payouts')
                          setShowPayoutDetails(false)
                          setGlobalPayoutsTab('overview')
                          setSelectedRepeatingPayout(null)
                        }
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                        isActive
                          ? 'text-indigo-600 bg-indigo-50 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon name={item.icon} size="small" fill={isActive ? '#4f46e5' : '#6b7280'} />
                      {item.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

        </nav>

        {/* Developer tools */}
        <div className="p-3 border-t border-gray-200">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            <Icon name="code" size="small" fill="#6b7280" />
            Developer tools
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-80">
            <Icon name="search" size="small" fill="#9ca3af" />
            <span className="text-gray-400 text-sm">Search...</span>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="apps" size="small" fill="#6b7280" />
            <Icon name="help" size="small" fill="#6b7280" />
            <Icon name="notification" size="small" fill="#6b7280" />
            <Icon name="settings" size="small" fill="#6b7280" />
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <Icon name="add" size="small" fill="#ffffff" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {showPayoutDetails && payoutDetails ? (
            payoutDetails.isRepeating ? (
              /* Repeating Payout Details Page */
              <div className="animate-[fadeIn_0.3s_ease-out]">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-4">
                  <button
                    onClick={() => setShowPayoutDetails(false)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Global payouts
                  </button>
                  <Icon name="chevronRight" size="small" fill="#9ca3af" />
                  <span className="text-gray-500">Repeating</span>
                </div>

                <div className="flex gap-8">
                  {/* Left content */}
                  <div className="flex-1">
                    {/* Amount and cadence badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <h1 className="text-3xl font-semibold text-gray-900">US${formatCurrency(payoutDetails.amount)}</h1>
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">{payoutDetails.cadence}</span>
                    </div>

                    {/* Title and subtitle */}
                    <h2 className="text-xl font-medium text-gray-900 mb-1">{payoutDetails.reference}</h2>
                    <p className="text-gray-600 mb-8">Recurring {payoutDetails.cadence?.toLowerCase()} payout to {payoutDetails.recipientName}</p>

                    {/* Next scheduled payout */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Next scheduled payout</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Payout ID</th>
                              <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                              <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Scheduled for</th>
                              <th className="text-right text-sm font-medium text-gray-500 px-4 py-3">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-gray-200">
                              <td className="px-4 py-3 text-sm text-gray-900">obp_65U1WZWh_roGEv4am</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded border border-indigo-200">Scheduled</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{payoutDetails.initiatesOn.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(payoutDetails.amount)} USD</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Posted payouts */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Posted payouts</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Payout ID</th>
                              <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                              <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Posted on</th>
                              <th className="text-right text-sm font-medium text-gray-500 px-4 py-3">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-gray-200">
                              <td className="px-4 py-3 text-sm text-gray-900">obp_65U1WZWh_roGEv4am</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded border border-green-200">Posted</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">Jan 12</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(payoutDetails.amount)} USD</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                              <td className="px-4 py-3 text-sm text-gray-900">obp_92N3LKJa_xy1Bc9rt</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded border border-green-200">Posted</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">Dec 12</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(payoutDetails.amount)} USD</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                              <td className="px-4 py-3 text-sm text-gray-900">obp_57593nsis_xy1fjer09</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded border border-red-200">Failed</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">Nov 12</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(payoutDetails.amount)} USD</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                              <td className="px-4 py-3 text-sm text-gray-900">obp_hfeue939s_ue8a0a</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded border border-green-200">Posted</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">Oct 12</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(payoutDetails.amount)} USD</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                              <td className="px-4 py-3 text-sm text-gray-900">obp_jdicjq92y4dn_183sjo9</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded border border-green-200">Posted</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">Sep 12</td>
                              <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(payoutDetails.amount)} USD</td>
                            </tr>
                            <tr className="border-t border-gray-200 bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900" colSpan="3">Total paid out</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(payoutDetails.amount * 5)} USD</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right sidebar */}
                  <div className="w-72">
                    {/* Action buttons */}
                    <div className="flex gap-2 mb-6">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Pause
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                    </div>

                    {/* Recipient card */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold">C</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{payoutDetails.recipientName}</p>
                        <p className="text-sm text-gray-500">{payoutDetails.recipientEmail}</p>
                      </div>
                    </div>

                    {/* Details list */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">From</p>
                        <p className="text-sm text-gray-600">Financial account USD</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">To</p>
                        <p className="text-sm text-gray-600">Bank **** **** {payoutDetails.accountLast4}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Repeats on</p>
                        <p className="text-sm text-gray-600">
                          {payoutDetails.cadence}, on the {payoutDetails.initiatesOn.getDate()}{payoutDetails.initiatesOn.getDate() === 1 || payoutDetails.initiatesOn.getDate() === 21 || payoutDetails.initiatesOn.getDate() === 31 ? 'st' : payoutDetails.initiatesOn.getDate() === 2 || payoutDetails.initiatesOn.getDate() === 22 ? 'nd' : payoutDetails.initiatesOn.getDate() === 3 || payoutDetails.initiatesOn.getDate() === 23 ? 'rd' : 'th'}
                        </p>
                      </div>
                      {payoutDetails.endsOn && (
                        <div>
                          <p className="text-sm font-medium text-gray-900">Ends on</p>
                          <p className="text-sm text-gray-600">{payoutDetails.endsOn.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivery method</p>
                        <p className="text-sm text-gray-600">Bank</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment method</p>
                        <p className="text-sm text-gray-600">{payoutDetails.method === 'ach' ? 'Standard transfer' : payoutDetails.method === 'wire' ? 'Wire transfer' : 'Email'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Reference</p>
                        <p className="text-sm text-gray-600">{payoutDetails.reference}</p>
                      </div>
                      {payoutDetails.statementDescriptor && (
                        <div>
                          <p className="text-sm font-medium text-gray-900">Statement descriptor</p>
                          <p className="text-sm text-gray-600">{payoutDetails.statementDescriptor}</p>
                        </div>
                      )}
                      {payoutDetails.isPayrollPayment && (
                        <div>
                          <p className="text-sm font-medium text-gray-900">Payment type</p>
                          <p className="text-sm text-gray-600">Payroll</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">Notify recipient</p>
                        <p className="text-sm text-gray-600">{payoutDetails.notifyRecipient ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Single Payout Details Page */
              <div className="animate-[fadeIn_0.3s_ease-out]">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-4">
                  <button
                    onClick={() => setShowPayoutDetails(false)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Global payouts
                  </button>
                  <Icon name="chevronRight" size="small" fill="#9ca3af" />
                  <span className="text-gray-500">Payouts to recipients</span>
                </div>

                <div className="flex gap-8">
                  {/* Left content */}
                  <div className="flex-1">
                    {/* Amount and status */}
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-semibold text-gray-900">US${formatCurrency(payoutDetails.amount)}</h1>
                      <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full border border-indigo-200">Scheduled</span>
                    </div>
                    <p className="text-gray-600 mb-8">Scheduled to payout to {payoutDetails.recipientName}</p>

                    {/* Total section */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">Total</h2>
                      <p className="text-sm text-gray-500 mb-4">Fees will post up to 24 hours after a transaction is initiated.</p>

                      <div className="space-y-4">
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Payout amount</span>
                          <span className="text-gray-900">US${formatCurrency(payoutDetails.amount)}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Standard payout fee</span>
                          <span className="text-gray-900">US${formatCurrency(payoutDetails.fee)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t border-gray-200 pt-4">
                          <span className="font-medium text-gray-900">Total</span>
                          <span className="font-medium text-gray-900">US${formatCurrency(payoutDetails.total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline section */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full border-2 border-gray-300 mt-1.5"></div>
                        <div className="flex-1 border-l border-gray-200 pl-4 pb-4 -ml-[7px]">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Payout created</p>
                              <p className="text-sm text-gray-500">Transaction ID {payoutDetails.transactionId}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right sidebar */}
                  <div className="w-72">
                    {/* Action buttons */}
                    <div className="flex gap-2 mb-6">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                    </div>

                    {/* Recipient card */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold">S</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{payoutDetails.recipientName}</p>
                        <p className="text-sm text-gray-500">{payoutDetails.recipientEmail}</p>
                      </div>
                    </div>

                    {/* Details list */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Initiates on</p>
                        <p className="text-sm text-gray-600">{payoutDetails.initiatesOn.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Transaction ID</p>
                        <p className="text-sm text-gray-600">{payoutDetails.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Trace ID</p>
                        <p className="text-sm text-gray-600">{payoutDetails.traceId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">From</p>
                        <p className="text-sm text-gray-600">Financial account USD</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">To</p>
                        <p className="text-sm text-gray-600">Bank **** **** {payoutDetails.accountLast4}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivery method</p>
                        <p className="text-sm text-gray-600">Bank</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment method</p>
                        <p className="text-sm text-gray-600">{payoutDetails.method === 'ach' ? 'Standard transfer' : payoutDetails.method === 'wire' ? 'Wire transfer' : 'Email'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Reference</p>
                        <p className="text-sm text-gray-600">{payoutDetails.reference}</p>
                      </div>
                      {payoutDetails.statementDescriptor && (
                        <div>
                          <p className="text-sm font-medium text-gray-900">Statement descriptor</p>
                          <p className="text-sm text-gray-600">{payoutDetails.statementDescriptor}</p>
                        </div>
                      )}
                      {payoutDetails.isPayrollPayment && (
                        <div>
                          <p className="text-sm font-medium text-gray-900">Payment type</p>
                          <p className="text-sm text-gray-600">Payroll</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">Notify recipient</p>
                        <p className="text-sm text-gray-600">{payoutDetails.notifyRecipient ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : currentPage === 'global-payouts' ? (
            /* Global Payouts Page */
            <div className="animate-[fadeIn_0.3s_ease-out]">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-[28px] font-semibold text-gray-900">Global payouts</h1>
                  {globalPayoutsTab !== 'recipients' && globalPayoutsTab !== 'repeating' && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded border border-gray-200 flex items-center gap-1">
                      Preview
                      <Icon name="download" size="small" fill="#6b7280" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {globalPayoutsTab === 'recipients' ? (
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <span className="text-sm font-medium text-gray-700">Add recipient</span>
                    </button>
                  ) : globalPayoutsTab === 'repeating' ? (
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                      <Icon name="add" size="small" fill="white" />
                      <span className="text-sm font-medium">Create repeating</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={openSendModal}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                      >
                        <Icon name="send" size="small" fill="white" />
                        <span className="text-sm font-medium">Send money</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="text-sm font-medium text-gray-700">+ Add money</span>
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Icon name="more" size="small" fill="#6b7280" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-gray-200 mb-6">
                <button
                  onClick={() => { setGlobalPayoutsTab('overview'); setSelectedRepeatingPayout(null); }}
                  className={`pb-3 text-sm font-medium ${globalPayoutsTab === 'overview' && !selectedRepeatingPayout ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => { setGlobalPayoutsTab('payouts-to-recipients'); setSelectedRepeatingPayout(null); }}
                  className={`pb-3 text-sm font-medium ${globalPayoutsTab === 'payouts-to-recipients' && !selectedRepeatingPayout ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Payouts to recipients
                </button>
                <button
                  onClick={() => { setGlobalPayoutsTab('recipients'); setSelectedRepeatingPayout(null); }}
                  className={`pb-3 text-sm font-medium ${globalPayoutsTab === 'recipients' && !selectedRepeatingPayout ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Recipients
                </button>
                <button
                  onClick={() => { setGlobalPayoutsTab('repeating'); setSelectedRepeatingPayout(null); }}
                  className={`pb-3 text-sm font-medium ${globalPayoutsTab === 'repeating' && !selectedRepeatingPayout ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Repeating
                </button>
              </div>

              {/* Repeating payout details view */}
              {selectedRepeatingPayout ? (
                <div className="animate-[fadeIn_0.2s_ease-out]">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm mb-6">
                    <button
                      onClick={() => setSelectedRepeatingPayout(null)}
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      Repeating
                    </button>
                    <Icon name="chevronRight" size="small" fill="#9ca3af" />
                    <span className="text-gray-500">{selectedRepeatingPayout.recipient}</span>
                  </div>

                  <div className="flex gap-8">
                    {/* Left content */}
                    <div className="flex-1">
                      {/* Amount and cadence badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-3xl font-semibold text-gray-900">US${selectedRepeatingPayout.amount}</h1>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                          selectedRepeatingPayout.statusColor === 'green'
                            ? 'text-green-600 bg-green-50 border-green-200'
                            : selectedRepeatingPayout.statusColor === 'orange'
                            ? 'text-orange-600 bg-orange-50 border-orange-200'
                            : selectedRepeatingPayout.statusColor === 'red'
                            ? 'text-red-600 bg-red-50 border-red-200'
                            : 'text-gray-600 bg-gray-100 border-gray-200'
                        }`}>{selectedRepeatingPayout.status}</span>
                      </div>

                      {/* Title and subtitle */}
                      <h2 className="text-xl font-medium text-gray-900 mb-1">{selectedRepeatingPayout.reference}</h2>
                      <p className="text-gray-600 mb-8">Recurring {selectedRepeatingPayout.cadence.toLowerCase()} payout to {selectedRepeatingPayout.recipient}</p>

                      {/* Next scheduled payout */}
                      {selectedRepeatingPayout.nextPayout !== '--' && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next scheduled payout</h3>
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Payout ID</th>
                                  <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                                  <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Scheduled for</th>
                                  <th className="text-right text-sm font-medium text-gray-500 px-4 py-3">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t border-gray-200">
                                  <td className="px-4 py-3 text-sm text-gray-900">obp_65U1WZWh_roGEv4am</td>
                                  <td className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded border border-indigo-200">Scheduled</span>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{selectedRepeatingPayout.nextPayout}</td>
                                  <td className="px-4 py-3 text-sm text-gray-900 text-right">{selectedRepeatingPayout.amount} USD</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Posted payouts */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Posted payouts</h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Payout ID</th>
                                <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                                <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Posted on</th>
                                <th className="text-right text-sm font-medium text-gray-500 px-4 py-3">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-900">obp_65U1WZWh_roGEv4am</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded border border-purple-200">Posted</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">Jan 12</td>
                                <td className="px-4 py-3 text-sm text-gray-900 text-right">{selectedRepeatingPayout.amount} USD</td>
                              </tr>
                              <tr className="border-t border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-900">obp_45K2XYZa_mnPQr3st</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded border border-purple-200">Posted</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">Dec 12</td>
                                <td className="px-4 py-3 text-sm text-gray-900 text-right">{selectedRepeatingPayout.amount} USD</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="w-80">
                      <div className="bg-gray-50 rounded-lg p-5">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Details</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Recipient</p>
                            <p className="text-sm font-medium text-gray-900">{selectedRepeatingPayout.recipient}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Cadence</p>
                            <p className="text-sm font-medium text-gray-900">{selectedRepeatingPayout.cadence}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Reference</p>
                            <p className="text-sm font-medium text-gray-900">{selectedRepeatingPayout.reference}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Amount per payout</p>
                            <p className="text-sm font-medium text-gray-900">{selectedRepeatingPayout.amount} USD</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded border ${
                              selectedRepeatingPayout.statusColor === 'green'
                                ? 'text-green-600 bg-green-50 border-green-200'
                                : selectedRepeatingPayout.statusColor === 'orange'
                                ? 'text-orange-600 bg-orange-50 border-orange-200'
                                : selectedRepeatingPayout.statusColor === 'red'
                                ? 'text-red-600 bg-red-50 border-red-200'
                                : 'text-gray-600 bg-gray-50 border-gray-200'
                            }`}>
                              {selectedRepeatingPayout.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <>
              {/* Payouts to recipients tab content */}
              {globalPayoutsTab === 'payouts-to-recipients' && (
                <div className="animate-[fadeIn_0.2s_ease-out]">
                  {/* Filter buttons */}
                  <div className="flex gap-2 mb-4">
                    {['All', 'Scheduled', 'Processing', 'Posted', 'Failed', 'Returned'].map((filter) => {
                      const isDisabled = filter !== 'Scheduled'
                      return (
                        <button
                          key={filter}
                          onClick={isDisabled ? undefined : () => setPayoutsFilter(filter)}
                          disabled={isDisabled}
                          className={`px-4 py-2 text-sm rounded-lg border ${
                            payoutsFilter === filter
                              ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                              : isDisabled
                                ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {filter}
                        </button>
                      )
                    })}
                  </div>

                  {/* Filter chips */}
                  <div className="flex gap-2 mb-6">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-full hover:border-gray-300">
                      <Icon name="add" size="small" fill="#6b7280" />
                      Status
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-full hover:border-gray-300">
                      <Icon name="add" size="small" fill="#6b7280" />
                      Type
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-full hover:border-gray-300">
                      <Icon name="add" size="small" fill="#6b7280" />
                      Date
                    </button>
                  </div>

                  {/* Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Recipient</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Type</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Scheduled for</th>
                          <th className="text-right text-sm font-medium text-gray-500 px-4 py-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Dynamically created scheduled payouts */}
                        {scheduledPayouts.map((payout, index) => (
                          <tr key={payout.id} className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => {
                            setPayoutDetails({
                              amount: payout.amount,
                              fee: payout.fee,
                              total: payout.amount + payout.fee,
                              recipientName: payout.recipientName,
                              recipientEmail: payout.recipientEmail,
                              initiatesOn: payout.initiatesOn,
                              accountLast4: payout.accountLast4,
                              method: payout.method,
                              transactionId: payout.id,
                              traceId: '76859372_9473X',
                              reference: payout.internalNote || 'Software services',
                              isRepeating: payout.isRepeating,
                              cadence: payout.cadence,
                              endsOn: payout.endsOn
                            })
                            setShowPayoutDetails(true)
                          }}>
                            <td className="px-4 py-3 text-sm text-gray-900">{payout.recipientName}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded border border-indigo-200">
                                {payout.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{payout.method === 'ach' ? 'Standard' : payout.method === 'wire' ? 'Wire' : 'Email'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{payout.initiatesOn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(payout.amount)} USD</td>
                          </tr>
                        ))}
                        {/* Static placeholder data */}
                        {[
                          { recipient: 'Cosmo Kramer', status: 'Scheduled', type: 'Standard', date: 'Feb 12', amount: '100.00' },
                          { recipient: 'Andrew T', status: 'Scheduled', type: 'Standard', date: 'Feb 12', amount: '570.17' },
                          { recipient: 'acct_1Qv5dXCuPmUmRwzI', status: 'Scheduled', type: 'Wire', date: 'Feb 13', amount: '983.25' },
                          { recipient: 'acct_1Qn1LwCccTsNEsIZ', status: 'Scheduled', type: 'Wire', date: 'Feb 13', amount: '489.83' },
                          { recipient: 'acct_1Qn1LwCccTs1LNQvu', status: 'Scheduled', type: 'Wire', date: 'Feb 14', amount: '694.68' },
                          { recipient: 'Yogesh S', status: 'Scheduled', type: 'Email', date: 'Feb 28', amount: '633.45' },
                          { recipient: 'crazy wtf', status: 'Scheduled', type: 'Crypto', date: 'Mar 2', amount: '1519.90' },
                          { recipient: 'Cosmo Kramer', status: 'Scheduled', type: 'Standard', date: 'Mar 2', amount: '1667.23' },
                          { recipient: 'doudou asdasd', status: 'Scheduled', type: 'Standard', date: 'Mar 2', amount: '1474.90' },
                          { recipient: 'doudou asdasd', status: 'Scheduled', type: 'Custom', date: 'Mar 2', amount: '1675.86' },
                          { recipient: 'doudou pang', status: 'Scheduled', type: 'Standard', date: 'Mar 2', amount: '1345.75' },
                        ].map((row, index) => (
                          <tr key={`static-${index}`} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{row.recipient}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded border border-indigo-200">
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.type}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.date}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">{row.amount} USD</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Recipients tab content */}
              {globalPayoutsTab === 'recipients' && (
                <div className="animate-[fadeIn_0.2s_ease-out]">
                  {/* Filter cards */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setRecipientsFilter('all')}
                      className={`flex-1 px-4 py-3 text-left rounded-lg border ${
                        recipientsFilter === 'all'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-900">All</span>
                      <span className="ml-2 text-sm text-gray-500">237</span>
                    </button>
                    <button
                      onClick={() => setRecipientsFilter('needs-action')}
                      className={`flex-1 px-4 py-3 text-left rounded-lg border ${
                        recipientsFilter === 'needs-action'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-900">Needs action</span>
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded">4</span>
                    </button>
                    <button
                      onClick={() => setRecipientsFilter('rejected')}
                      className={`flex-1 px-4 py-3 text-left rounded-lg border ${
                        recipientsFilter === 'rejected'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-900">Rejected</span>
                      <span className="ml-2 text-sm text-gray-500">13</span>
                    </button>
                  </div>

                  {/* Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Name</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Email</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">ID</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Created</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'AWS', status: 'Information needed', statusColor: 'yellow', email: 'awsbilling@amazon.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Creed Brat', status: 'Not enabled', statusColor: 'red', email: 'creedbrat@hotmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Darryl Philbin', status: 'Pending', statusColor: 'gray', email: 'darrylphil@dundermifflin.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Gabe Lewis', status: 'Rejected', statusColor: 'gray', email: 'gabelewis@gmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Paul Lambert', status: null, email: 'pamb123@gmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Ryan Howard', status: null, email: 'rhoward@gmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Jose Farino', status: null, email: 'Josefa27@hotmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Austin Graham', status: null, email: 'Austin5@gmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Riley Murray', status: null, email: 'Riley.Murray@hotmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Reece Chambers', status: null, email: 'ReeceChambers@rhyta.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'FlexPort', status: null, email: 'finance@flexport.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Bert Jacobs', status: null, email: 'bertjacobs@sbcglobal.net', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Ryan Howard', status: null, email: 'ryanhoward@gmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Lulu Siegel', status: null, email: 'lulu@gmail.com', id: '000023867236782', created: 'May 16, 6:10 PM' },
                          { name: 'Holly Flax', status: null, email: 'hflax90@sbcglobal.net', id: '000023867236782', created: 'May 16, 6:10 PM' },
                        ].map((row, index) => (
                          <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-900">{row.name}</span>
                                {row.status && (
                                  <span className={`px-2 py-0.5 text-xs font-medium rounded border ${
                                    row.statusColor === 'yellow'
                                      ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
                                      : row.statusColor === 'red'
                                      ? 'text-red-600 bg-red-50 border-red-200'
                                      : 'text-gray-600 bg-gray-50 border-gray-200'
                                  }`}>
                                    {row.status}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.created}</td>
                            <td className="px-4 py-3">
                              <button className="text-gray-400 hover:text-gray-600">
                                <Icon name="more" size="small" fill="currentColor" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Repeating tab content */}
              {globalPayoutsTab === 'repeating' && (
                <div className="animate-[fadeIn_0.2s_ease-out]">
                  {/* Filter chips */}
                  <div className="flex gap-2 mb-6">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-full hover:border-gray-300">
                      <Icon name="add" size="small" fill="#6b7280" />
                      Status
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-full hover:border-gray-300">
                      <Icon name="add" size="small" fill="#6b7280" />
                      Type
                    </button>
                  </div>

                  {/* Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Recipient</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Reference</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Cadence</th>
                          <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Next payout</th>
                          <th className="text-right text-sm font-medium text-gray-500 px-4 py-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { recipient: 'Cosmo Kramer', reference: 'Software', status: 'Active', statusColor: 'green', cadence: '12th, Monthly', nextPayout: 'Feb 12', amount: '100.00' },
                          { recipient: 'Andrew T', reference: 'Maintenance', status: 'Active', statusColor: 'green', cadence: '1st, Monthly', nextPayout: 'Mar 1', amount: '570.17' },
                          { recipient: 'acct_1Qv5dXCuPmUmRwzI', reference: 'Adjustment', status: 'Active', statusColor: 'green', cadence: 'Mon, Weekly', nextPayout: 'Feb 17', amount: '983.25' },
                          { recipient: 'acct_1Qn1LwCccTsNEsIZ', reference: 'Adjustment', status: 'Active', statusColor: 'green', cadence: 'Mon, Weekly', nextPayout: 'Feb 17', amount: '489.83' },
                          { recipient: 'acct_1Qn1LwCccTs1LNQvu', reference: 'Adjustment', status: 'Active', statusColor: 'green', cadence: 'Mon, Weekly', nextPayout: 'Feb 17', amount: '694.68' },
                          { recipient: 'Yogesh S', reference: 'Software', status: 'Cancelled', statusColor: 'gray', cadence: '12 Instances', nextPayout: '--', amount: '633.45' },
                          { recipient: 'crazy wtf', reference: 'Software', status: 'Active', statusColor: 'green', cadence: 'Annually', nextPayout: 'Jan 1', amount: '1519.90' },
                          { recipient: 'linda shu', reference: 'Maintenance', status: 'Finished', statusColor: 'gray', cadence: '12 Instances', nextPayout: '--', amount: '1667.23' },
                          { recipient: 'doudou asdasd', reference: 'Maintenance', status: 'Paused', statusColor: 'orange', cadence: '12 Instances', nextPayout: '--', amount: '1474.90' },
                          { recipient: 'doudou asdasd', reference: 'Accounting', status: 'Failed', statusColor: 'red', cadence: '1st, Monthly', nextPayout: 'Mar 1', amount: '1675.86' },
                          { recipient: 'doudou pang', reference: 'Accounting', status: 'Finished', statusColor: 'gray', cadence: '1st, Monthly', nextPayout: '--', amount: '1345.75' },
                          { recipient: 'vanglu shu', reference: 'Software', status: 'Paused', statusColor: 'orange', cadence: '1st, Monthly', nextPayout: '--', amount: '72.34' },
                        ].map((row, index) => (
                          <tr
                            key={index}
                            onClick={() => setSelectedRepeatingPayout(row)}
                            className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                          >
                            <td className="px-4 py-3 text-sm text-gray-900">{row.recipient}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.reference}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 text-xs font-medium rounded border ${
                                row.statusColor === 'green'
                                  ? 'text-green-600 bg-green-50 border-green-200'
                                  : row.statusColor === 'orange'
                                  ? 'text-orange-600 bg-orange-50 border-orange-200'
                                  : row.statusColor === 'red'
                                  ? 'text-red-600 bg-red-50 border-red-200'
                                  : 'text-gray-600 bg-gray-50 border-gray-200'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.cadence}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.nextPayout}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">{row.amount} USD</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Overview tab content */}
              {globalPayoutsTab === 'overview' && (
                <>
              {/* Test FA Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Test FA</h2>
                    <p className="text-sm text-gray-500">US$12.45 available (estimate as of 12 Feb, 18:03)</p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">
                    All currencies
                    <Icon name="chevronUpDown" size="small" fill="#6b7280" />
                  </button>
                </div>

                {/* Currency cards */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <p className="font-medium text-gray-900">US$2.45 USD</p>
                      <p className="text-sm text-gray-500">US$0.00 available soon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇪🇺</span>
                    <div>
                      <p className="font-medium text-gray-900">€0.00 EUR</p>
                      <p className="text-sm text-gray-500">€0.00 available soon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <p className="font-medium text-gray-900">£0.00 GBP</p>
                      <p className="text-sm text-gray-500">£0.00 available soon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">$</span>
                    <div>
                      <p className="font-medium text-gray-900">$10.00 USDC</p>
                      <p className="text-sm text-gray-500">$0.00 available soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current status */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current status</h2>
                <div className="grid grid-cols-2 gap-8">
                  {/* Payout states today */}
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-sm font-medium text-gray-700">Payout states today</span>
                      <Icon name="info" size="small" fill="#9ca3af" />
                    </div>
                    {/* Progress bar */}
                    <div className="flex h-2 rounded-full overflow-hidden mb-4">
                      <div className="bg-purple-400" style={{ width: '64%' }}></div>
                      <div className="bg-indigo-500" style={{ width: '29%' }}></div>
                      <div className="bg-orange-400" style={{ width: '7%' }}></div>
                    </div>
                    {/* Legend */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Posted</span>
                        </div>
                        <span className="text-sm text-gray-900">54</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
                          <span className="text-sm text-gray-600">In progress</span>
                        </div>
                        <span className="text-sm text-gray-900">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-cyan-400 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Voided</span>
                        </div>
                        <span className="text-sm text-gray-900">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Failed</span>
                        </div>
                        <span className="text-sm text-gray-900">6</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipient states today */}
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-sm font-medium text-gray-700">Recipient states today</span>
                      <Icon name="info" size="small" fill="#9ca3af" />
                    </div>
                    {/* Progress bar */}
                    <div className="flex h-2 rounded-full overflow-hidden mb-4">
                      <div className="bg-purple-400" style={{ width: '56%' }}></div>
                      <div className="bg-indigo-500" style={{ width: '44%' }}></div>
                    </div>
                    {/* Legend */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Ready</span>
                        </div>
                        <span className="text-sm text-gray-900">94</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Needs Action</span>
                        </div>
                        <span className="text-sm text-gray-900">73</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-cyan-400 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Pending</span>
                        </div>
                        <span className="text-sm text-gray-900">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Rejected</span>
                        </div>
                        <span className="text-sm text-gray-900">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historical performance */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Historical performance</h2>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">
                      Last 3 months
                      <Icon name="chevronUpDown" size="small" fill="#6b7280" />
                    </button>
                    <span className="text-sm text-gray-500">compared to</span>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">
                      Previous period
                      <Icon name="chevronUpDown" size="small" fill="#6b7280" />
                    </button>
                  </div>
                </div>

                {/* Charts grid */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Total payouts sent */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm text-gray-600">Total payouts sent</span>
                      <Icon name="info" size="small" fill="#9ca3af" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 mb-4">56</p>
                    <div className="h-20 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 300 80">
                        <path d="M0,70 Q50,70 100,60 T200,30 T300,10" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Nov 2025</span>
                      <span>Dec 2025</span>
                      <span>Jan 2026</span>
                    </div>
                  </div>

                  {/* Total payout volume */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm text-gray-600">Total payout volume</span>
                      <Icon name="info" size="small" fill="#9ca3af" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 mb-4">US$56.50</p>
                    <div className="h-20 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 300 80">
                        <path d="M0,70 Q50,70 100,60 T200,30 T300,10" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Nov 2025</span>
                      <span>Dec 2025</span>
                      <span>Jan 2026</span>
                    </div>
                  </div>

                  {/* Percentage of payouts posted */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm text-gray-600">Percentage of payouts posted</span>
                      <Icon name="info" size="small" fill="#9ca3af" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 mb-4">85%</p>
                    <div className="h-20 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 300 80">
                        <path d="M0,20 Q100,20 150,20 T250,50 T300,60" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Nov 2025</span>
                      <span>Dec 2025</span>
                      <span>Jan 2026</span>
                    </div>
                  </div>

                  {/* New recipients added */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm text-gray-600">New recipients added</span>
                      <Icon name="info" size="small" fill="#9ca3af" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 mb-4">151</p>
                    <div className="h-20 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 300 80">
                        <path d="M0,70 Q50,70 100,65 T200,40 T300,10" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Nov 2025</span>
                      <span>Dec 2025</span>
                      <span>Jan 2026</span>
                    </div>
                  </div>
                </div>
              </div>
              </>
              )}
              </>
              )}
            </div>
          ) : (
          <>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-[28px] font-semibold text-gray-900">Balances</h1>
            <span className="text-[28px] text-gray-500">$22,594.21</span>
            <Icon name="info" size="small" fill="#9ca3af" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-[6px] mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
              <Icon name="bolt" size="small" fill="currentColor" />
              <span className="text-sm">Instant Payout</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
              <Icon name="transfer" size="small" fill="currentColor" />
              <span className="text-sm">Transfer</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
              <Icon name="bank" size="small" fill="currentColor" />
              <span className="text-sm">Add funds</span>
            </button>
            <button
              onClick={openSendModal}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
            >
              <Icon name="send" size="small" fill="currentColor" />
              <span className="text-sm">Send</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
              <Icon name="card" size="small" fill="currentColor" />
              <span className="text-sm">Create card</span>
            </button>
          </div>

          {/* Balance cards */}
          <div className="rounded-xl p-3 mb-8" style={{ backgroundImage: 'url(/gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex gap-3">
              {/* Payments balance card */}
              <div className="w-[230px] h-[200px] bg-white/95 backdrop-blur rounded-lg p-5 shadow-md flex flex-col">
                <div className="text-sm text-gray-600 mb-1">Payments balance</div>
                <div className="text-2xl font-normal text-gray-900 mb-1">$20,594.21</div>
                <div className="text-sm text-gray-500">$18,661.51 incoming</div>
                <div className="flex gap-3 mt-auto">
                  <Icon name="bolt" size="small" fill="#6b7280" />
                  <Icon name="transfer" size="small" fill="#6b7280" />
                  <Icon name="bank" size="small" fill="#6b7280" />
                </div>
              </div>
              {/* Financial account card */}
              <div className="w-[230px] h-[200px] bg-white/90 backdrop-blur rounded-lg p-5 shadow-md flex flex-col">
                <div className="text-sm text-gray-600 mb-1">Financial account</div>
                <div className="text-2xl font-normal text-gray-900 mb-1">$2,000.00</div>
                <div className="flex gap-3 mt-auto">
                  <Icon name="transfer" size="small" fill="#6b7280" />
                  <Icon name="send" size="small" fill="#6b7280" />
                  <Icon name="card" size="small" fill="#6b7280" />
                </div>
              </div>
            </div>
          </div>

          {/* Content row with Recent activity and sidebar */}
          <div className="flex gap-8">
            {/* Recent activity */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent activity</h2>

              {/* Tabs */}
              <div className="flex gap-6 mb-4 border-b border-gray-200">
                <button className="pb-3 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                  Payouts to bank
                </button>
                <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Financial account
                </button>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Destination</th>
                    <th className="pb-3 font-medium text-right">Arrive by</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-2">
                        <span className="font-medium text-gray-900">{payout.amount}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                          payout.statusColor === 'blue'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-green-50 text-green-600'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="py-2 text-sm text-gray-600">
                        {payout.from} <span className="text-gray-400">→</span> {payout.to}
                      </td>
                      <td className="py-3 text-sm text-gray-600 text-right">{payout.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View more
              </button>
            </div>

            {/* Right sidebar */}
            <div className="w-72">
              {/* Upcoming */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h2>
                <div className="space-y-3">
                  {upcoming.map((item, index) => (
                    <div key={index} className="flex items-center rounded-2xl overflow-hidden border border-gray-200" style={{ backgroundColor: '#f5f3ff' }}>
                      <div className="text-center min-w-[60px] px-3 py-2">
                        <div className="text-[11px] font-medium text-gray-400 tracking-wide">{item.month}</div>
                        <div className="text-[26px] font-normal text-gray-500">{item.day}</div>
                      </div>
                      <div className="flex-1 bg-white px-4 py-2 rounded-r-2xl">
                        <div className="font-medium text-gray-800">{item.amount}</div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
                <div className="space-y-1">
                  {resources.map((item) => (
                    <a
                      key={item.name}
                      href="#"
                      className="flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-gray-900"
                    >
                      <Icon name={item.icon} size="small" fill="#6b7280" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </>
          )}
        </main>
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isModalClosing ? 'animate-[fadeOut_0.2s_ease-out]' : 'animate-[fadeIn_0.2s_ease-out]'}`}>
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(192, 200, 210, 0.7)' }}
            onClick={closeSendModal}
          />

          {/* Modal */}
          <div className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-out ${isModalClosing ? 'animate-[slideDown_0.2s_ease-out]' : 'animate-[slideUp_0.2s_ease-out]'} ${modalStep === 'business-type' || modalStep === 'bank-details' || modalStep === 'confirm' || modalStep === 'repeat-config' || modalStep === 'summary' ? 'w-[960px] h-[720px]' : modalStep === 'add-recipient' ? 'w-[500px] max-h-[80vh] overflow-y-auto' : modalStep === 'success' ? 'w-[480px]' : 'w-[400px] max-h-[80vh] overflow-y-auto'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-4">
              <div className="flex items-center gap-2">
                <Icon name="send" size="small" fill="#374151" />
                <h2 className="text-lg font-semibold text-gray-900">Send</h2>
              </div>
              <button
                onClick={closeSendModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="close" size="small" fill="currentColor" />
              </button>
            </div>

            {/* Content */}
            {modalStep === 'choose-recipient' && (
              <div className="px-5 pb-5 animate-[slideInLeft_0.3s_ease-out]">
                <p className="text-sm text-gray-500 mb-4">Choose recipient</p>

                {/* Search input */}
                <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg mb-4">
                  <Icon name="search" size="small" fill="#9ca3af" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or Stripe account"
                    className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none"
                  />
                </div>

                {/* Add new recipient */}
                <button
                  onClick={() => setModalStep('add-recipient')}
                  className="flex items-center justify-between w-full py-3 mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Icon name="add" size="small" fill="#6366f1" />
                    </div>
                    <span className="text-indigo-600 font-medium">Add new recipient</span>
                  </div>
                  <Icon name="chevronRight" size="small" fill="#6366f1" />
                </button>

                {/* Recipients list */}
                <div className="space-y-1">
                  {recipients.map((recipient) => (
                    <button
                      key={recipient.email}
                      onClick={() => {
                        setIsExistingRecipient(true)
                        setSelectedRecipientName(recipient.name)
                        setRecipientEmail(recipient.email)
                        setSelectedMethod('ach')
                        setAccountNumber('6789')
                        setModalStep('confirm')
                      }}
                      className="flex flex-col items-start w-full py-[6px] hover:bg-gray-50 rounded-lg px-2 -mx-2 text-left"
                    >
                      <span className="font-medium text-gray-900">{recipient.name}</span>
                      <span className="text-sm text-gray-400">{recipient.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modalStep === 'add-recipient' && (
              <div
                className="px-5 pb-4 animate-[slideInRight_0.3s_ease-out]"
                onKeyDown={(e) => e.key === 'Enter' && canContinue && setModalStep('business-type')}
              >
                {/* Email input */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Recipient's email adress</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                  />
                </div>

                {/* Country select */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Recipient's country</label>
                  <div className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-sm text-gray-900">United States</span>
                    </div>
                    <Icon name="chevronDown" size="small" fill="#6b7280" />
                  </div>
                </div>

                {/* Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-3">Method</label>
                  <div className="space-y-3">
                    {/* Pay via email - disabled */}
                    <div
                      className="p-4 border rounded-lg border-gray-200 opacity-50 cursor-not-allowed"
                    >
                      <div className="flex items-start gap-3">
                        <Icon name="send" size="small" fill="#9ca3af" />
                        <div>
                          <div className="font-medium text-gray-400">Pay via email</div>
                          <div className="text-sm text-gray-400">Arrives in minutes · As low as $1 fee</div>
                          <div className="text-sm text-gray-300">Stripe will collect payout details from recipient via email</div>
                        </div>
                      </div>
                    </div>

                    {/* Standard ACH */}
                    <div
                      onClick={() => setSelectedMethod('ach')}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedMethod === 'ach'
                          ? 'border-indigo-500 border-2'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon name="bank" size="small" fill={selectedMethod === 'ach' ? '#6366f1' : '#6b7280'} />
                        <div>
                          <div className="font-medium text-gray-900">Standard ACH</div>
                          <div className="text-sm text-gray-500">Arrives in 2-3 days · $7.50 fee</div>
                          <div className="text-sm text-gray-400">You will provide payout and business details in the next step</div>
                        </div>
                      </div>
                    </div>

                    {/* Wire transfer */}
                    <div
                      onClick={() => setSelectedMethod('wire')}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedMethod === 'wire'
                          ? 'border-indigo-500 border-2'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon name="bank" size="small" fill={selectedMethod === 'wire' ? '#6366f1' : '#6b7280'} />
                        <div>
                          <div className="font-medium text-gray-900">Wire transfer</div>
                          <div className="text-sm text-gray-500">Arrives in minutes · $10.00 fee</div>
                          <div className="text-sm text-gray-400">You will provide payout and business details in the next step</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setModalStep('choose-recipient')}
                    className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    disabled={!canContinue}
                    onClick={() => canContinue && setModalStep('business-type')}
                    className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                      canContinue
                        ? 'bg-indigo-500 hover:bg-indigo-600'
                        : 'bg-indigo-300 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {modalStep === 'business-type' && (
              <div
                className="flex h-[calc(100%-60px)]"
                onKeyDown={(e) => e.key === 'Enter' && canContinueBusinessType && setModalStep('bank-details')}
              >
                {/* Left side - Form */}
                <div className="flex-1 flex flex-col animate-[slideInRight_0.3s_ease-out]">
                  {/* Scrollable form content */}
                  <div className="flex-1 px-5 pt-2 overflow-y-auto">
                    {/* Business type dropdown */}
                    <div className="mb-5 relative">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Type of business</label>
                      <div
                        onClick={() => setShowBusinessTypeDropdown(!showBusinessTypeDropdown)}
                        className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                      >
                        <span className={`text-sm ${businessType ? 'text-gray-900' : 'text-gray-500'}`}>
                          {businessType === 'individual' ? 'Individual' : businessType === 'company' ? 'Company' : 'Select business type'}
                        </span>
                        <Icon name="chevronDown" size="small" fill="#6b7280" />
                      </div>
                      {showBusinessTypeDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => {
                              setBusinessType('individual')
                              setShowBusinessTypeDropdown(false)
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 rounded-t-lg"
                          >
                            Individual
                          </button>
                          <button
                            onClick={() => {
                              setBusinessType('company')
                              setShowBusinessTypeDropdown(false)
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 rounded-b-lg"
                          >
                            Company
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Individual fields */}
                    {businessType === 'individual' && (
                      <>
                        <div className="mb-5">
                          <label className="block text-sm font-medium text-gray-900 mb-2">Legal first name</label>
                          <input
                            type="text"
                            placeholder="Legal first name"
                            value={legalFirstName}
                            onChange={(e) => setLegalFirstName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block text-sm font-medium text-gray-900 mb-2">Legal last name</label>
                          <input
                            type="text"
                            placeholder="Legal last name"
                            value={legalLastName}
                            onChange={(e) => setLegalLastName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Buttons - fixed at bottom */}
                  <div className="flex justify-end gap-3 px-5 pb-4">
                    <button
                      onClick={() => setModalStep('add-recipient')}
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      disabled={!canContinueBusinessType}
                      onClick={() => canContinueBusinessType && setModalStep('bank-details')}
                      className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                        canContinueBusinessType
                          ? 'bg-indigo-500 hover:bg-indigo-600'
                          : 'bg-indigo-300 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {/* Right side - Preview */}
                <div className="w-1/2 my-4 mr-4 p-4 rounded-2xl flex items-center justify-center" style={{ backgroundImage: 'url(/right-gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="bg-white rounded-xl p-5 shadow-md border-[12px] border-gray-100">
                    <div key={modalStep} className="animate-[fadeIn_0.3s_ease-out]">
                      {/* Review section */}
                      <h3 className="font-semibold text-gray-900 mb-4">Review</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">From</span>
                          <div className="w-32 h-4 bg-gray-100 rounded"></div>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">To</span>
                          <div className="w-32 h-4 bg-gray-100 rounded"></div>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Method</span>
                          <span className="text-gray-900">
                            {selectedMethod === 'email' ? 'Pay via email' : selectedMethod === 'ach' ? 'Standard ACH' : selectedMethod === 'wire' ? 'Wire transfer' : ''}
                          </span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Initiated</span>
                          <span className="text-gray-900">September 30, 2025</span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Estimated arrival</span>
                          <span className="text-gray-900">
                            {selectedMethod === 'email' ? 'Minutes' : selectedMethod === 'ach' ? '2-3 business days' : selectedMethod === 'wire' ? 'Minutes' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Fees section */}
                      <div className="border-t border-gray-100 mt-5 pt-5">
                        <h3 className="font-semibold text-gray-900 mb-2">Fees</h3>
                        <p className="text-sm text-gray-500 mb-3">Fees are collected separately from your balance at the end of each day.</p>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Payout amount</span>
                            <div className="w-24 h-4 bg-gray-100 rounded"></div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Standard payout fee</span>
                            <span className="text-gray-900">
                              {selectedMethod === 'email' ? '$1.00' : selectedMethod === 'ach' ? '$7.50' : selectedMethod === 'wire' ? '$10.00' : ''}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">You'll pay</span>
                            <div className="w-24 h-4 bg-gray-100 rounded"></div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">They'll receive</span>
                            <div className="w-24 h-4 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalStep === 'bank-details' && (
              <div
                className="flex h-[calc(100%-60px)]"
                onKeyDown={(e) => e.key === 'Enter' && canContinueBankDetails && setModalStep('confirm')}
              >
                {/* Left side - Form */}
                <div className="flex-1 flex flex-col animate-[slideInRight_0.3s_ease-out]">
                  {/* Scrollable form content */}
                  <div className="flex-1 px-5 pt-2 overflow-y-auto">
                    {/* Routing number */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Routing number</label>
                      <input
                        type="text"
                        placeholder="110000000"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                      />
                    </div>

                    {/* Account number */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Account number</label>
                      <input
                        type="text"
                        placeholder="000123456789"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                      />
                    </div>

                    {/* Confirm account number */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Confirm account number</label>
                      <input
                        type="text"
                        placeholder="000123456789"
                        value={confirmAccountNumber}
                        onChange={(e) => setConfirmAccountNumber(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Buttons - fixed at bottom */}
                  <div className="flex justify-end gap-3 px-5 pb-4">
                    <button
                      onClick={() => setModalStep('business-type')}
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      disabled={!canContinueBankDetails}
                      onClick={() => canContinueBankDetails && setModalStep('confirm')}
                      className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                        canContinueBankDetails
                          ? 'bg-indigo-500 hover:bg-indigo-600'
                          : 'bg-indigo-300 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {/* Right side - Preview */}
                <div className="w-1/2 my-4 mr-4 p-4 rounded-2xl flex items-center justify-center" style={{ backgroundImage: 'url(/right-gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="bg-white rounded-xl p-5 shadow-md border-[12px] border-gray-100">
                    <div key={modalStep} className="animate-[fadeIn_0.3s_ease-out]">
                      {/* Review section */}
                      <h3 className="font-semibold text-gray-900 mb-4">Review</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">From</span>
                          <div className="w-32 h-4 bg-gray-100 rounded"></div>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">To</span>
                          <div className="w-32 h-4 bg-gray-100 rounded"></div>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Method</span>
                          <span className="text-gray-900">
                            {selectedMethod === 'email' ? 'Pay via email' : selectedMethod === 'ach' ? 'Standard ACH' : selectedMethod === 'wire' ? 'Wire transfer' : ''}
                          </span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Initiated</span>
                          <span className="text-gray-900">September 30, 2025</span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Estimated arrival</span>
                          <span className="text-gray-900">
                            {selectedMethod === 'email' ? 'Minutes' : selectedMethod === 'ach' ? '2-3 business days' : selectedMethod === 'wire' ? 'Minutes' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Fees section */}
                      <div className="border-t border-gray-100 mt-5 pt-5">
                        <h3 className="font-semibold text-gray-900 mb-2">Fees</h3>
                        <p className="text-sm text-gray-500 mb-3">Fees are collected separately from your balance at the end of each day.</p>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Payout amount</span>
                            <div className="w-24 h-4 bg-gray-100 rounded"></div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Standard payout fee</span>
                            <span className="text-gray-900">
                              {selectedMethod === 'email' ? '$1.00' : selectedMethod === 'ach' ? '$7.50' : selectedMethod === 'wire' ? '$10.00' : ''}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">You'll pay</span>
                            <div className="w-24 h-4 bg-gray-100 rounded"></div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">They'll receive</span>
                            <div className="w-24 h-4 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalStep === 'confirm' && (
              <div
                className="flex h-[calc(100%-60px)]"
                onKeyDown={(e) => e.key === 'Enter' && canContinueConfirm && setModalStep(repeatPayout ? 'repeat-config' : 'summary')}
              >
                {/* Left side - Payment details */}
                <div className="flex-1 flex flex-col animate-[slideInRight_0.3s_ease-out]">
                  {/* Scrollable form content */}
                  <div className="flex-1 px-5 pt-2 overflow-y-auto">
                    {/* Amount input */}
                    <div className="flex items-baseline justify-center mb-6 pb-4">
                      <span className="text-2xl text-gray-600 mr-1">$</span>
                      <div className="border-b-2 border-gray-700">
                        <input
                          type="text"
                          value={payoutAmount}
                          onChange={(e) => setPayoutAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                          placeholder="0"
                          className="text-6xl font-medium text-gray-700 w-32 outline-none text-center placeholder-gray-300"
                        />
                      </div>
                      <div className="flex items-center ml-2">
                        <div className="h-8 w-px bg-gray-300 mr-2"></div>
                        <span className="text-lg text-gray-400">USD</span>
                      </div>
                    </div>

                    {/* From section */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-500 mb-2">From</label>
                      <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Financial account</div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <span>🇺🇸</span>
                              <span>USD</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-900">
                          <span>$2,819.49</span>
                          <Icon name="chevronUpDown" size="small" fill="#6b7280" />
                        </div>
                      </div>
                    </div>

                    {/* To section */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-500 mb-2">To</label>
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon name="customers" size="small" fill="#6b7280" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {isExistingRecipient ? selectedRecipientName : businessType === 'individual' ? `${legalFirstName} ${legalLastName}` : 'Cosmo Kramer'}
                          </div>
                          <div className="text-sm text-gray-500">USD · Wells Fargo ····{accountNumber.slice(-4) || '1234'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Method section */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-500 mb-2">Method</label>
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon name="bank" size="small" fill="#6b7280" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {selectedMethod === 'email' ? 'Pay via email' : selectedMethod === 'ach' ? 'Standard ACH' : 'Wire transfer'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedMethod === 'email' ? 'Arrives in minutes · $1.00 fee' : selectedMethod === 'ach' ? 'Arrives in 2-3 days · $7.50 fee' : 'Arrives in minutes · $10.00 fee'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* When section */}
                    <div className="mb-3 relative">
                      <label className="block text-sm font-medium text-gray-500 mb-2">When</label>
                      <div
                        onClick={() => showCalendar ? closeCalendar() : setShowCalendar(true)}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                      >
                        <span className="text-gray-900">{formatSelectedDate()}</span>
                        <Icon name="calendar" size="small" fill="#6b7280" />
                      </div>

                      {/* Calendar popup */}
                      {showCalendar && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={closeCalendar} />
                          <div className={`absolute bottom-full right-0 mb-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-4 w-[300px] ${isCalendarClosing ? 'animate-[fadeOut_0.15s_ease-out]' : 'animate-[fadeIn_0.2s_ease-out]'}`}>
                          {/* Calendar header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-gray-900">{monthNames[calendarMonth]} {calendarYear}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={prevMonth}
                                disabled={calendarMonth === new Date().getMonth() && calendarYear === new Date().getFullYear()}
                                className={`p-1 rounded ${calendarMonth === new Date().getMonth() && calendarYear === new Date().getFullYear() ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                              >
                                <Icon name="chevronLeft" size="small" fill="#6b7280" />
                              </button>
                              <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                                <Icon name="chevronRight" size="small" fill="#6b7280" />
                              </button>
                            </div>
                          </div>

                          {/* Day names */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map((day) => (
                              <div key={day} className="text-center text-sm text-gray-500 py-1">{day}</div>
                            ))}
                          </div>

                          {/* Calendar days */}
                          <div className={`grid grid-cols-7 gap-1 h-[228px] ${calendarSlideDirection === 'left' ? 'animate-[slideInRight_0.2s_ease-out]' : calendarSlideDirection === 'right' ? 'animate-[slideInLeft_0.2s_ease-out]' : ''}`}>
                            {/* Empty cells for days before the first of the month */}
                            {Array.from({ length: getFirstDayOfMonth(calendarMonth, calendarYear) }).map((_, i) => (
                              <div key={`empty-${i}`} className="p-2"></div>
                            ))}
                            {/* Days of the month */}
                            {Array.from({ length: getDaysInMonth(calendarMonth, calendarYear) }).map((_, i) => {
                              const day = i + 1
                              const past = isPastDay(day)
                              return (
                                <button
                                  key={day}
                                  onClick={() => !past && handleDateSelect(day)}
                                  disabled={past}
                                  className={`p-2 text-sm rounded-lg ${
                                    past
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : isSelected(day)
                                      ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                                      : isToday(day)
                                      ? 'text-indigo-600 font-bold hover:bg-gray-100'
                                      : 'text-gray-900 hover:bg-gray-100'
                                  }`}
                                >
                                  {day}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                        </>
                      )}
                    </div>

                  </div>

                  {/* Buttons - fixed at bottom */}
                  <div className="flex justify-end gap-3 px-5 pb-4">
                    <button
                      onClick={() => setModalStep(isExistingRecipient ? 'choose-recipient' : 'bank-details')}
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      disabled={!canContinueConfirm}
                      onClick={() => canContinueConfirm && setModalStep(repeatPayout ? 'repeat-config' : 'summary')}
                      className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                        canContinueConfirm
                          ? 'bg-indigo-500 hover:bg-indigo-600'
                          : 'bg-indigo-300 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {/* Right side - Preview */}
                <div className="w-1/2 my-4 mr-4 p-4 rounded-2xl flex items-center justify-center" style={{ backgroundImage: 'url(/right-gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="bg-white rounded-xl p-5 shadow-md border-[12px] border-gray-100">
                    <div key={modalStep} className="animate-[fadeIn_0.3s_ease-out]">
                      {/* Review section */}
                      <h3 className="font-semibold text-gray-900 mb-4">Review</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-6 items-start">
                          <span className="text-gray-500 w-28">From</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">S</span>
                            </div>
                            <div>
                              <div className="text-gray-900">Financial account</div>
                              <div className="text-gray-500">USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-6 items-start">
                          <span className="text-gray-500 w-28">To</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 bg-red-700 rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">WF</span>
                            </div>
                            <div>
                              <div className="text-gray-900">Wells Fargo ····{accountNumber.slice(-4) || '1234'}</div>
                              <div className="text-gray-500">USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Method</span>
                          <span className="text-gray-900 flex-1">
                            {selectedMethod === 'email' ? 'Pay via email' : selectedMethod === 'ach' ? 'Standard ACH' : selectedMethod === 'wire' ? 'Wire transfer' : ''}
                          </span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">{selectedDate.toDateString() === new Date().toDateString() ? 'Initiated on' : 'Initiates on'}</span>
                          <span className="text-gray-900 flex-1">{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Estimated arrival</span>
                          <span className="text-gray-900 flex-1">
                            {selectedMethod === 'email' ? 'Minutes' : selectedMethod === 'ach' ? '2-3 business days' : selectedMethod === 'wire' ? 'Minutes' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Fees section */}
                      <div className="border-t border-gray-100 mt-5 pt-5">
                        <h3 className="font-semibold text-gray-900 mb-2">Fees</h3>
                        <p className="text-sm text-gray-500 mb-3">Fees are collected separately from your balance at the end of each day.</p>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Payout amount</span>
                            <span className="text-gray-900">${formatCurrency(getPayoutAmountNum())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Standard payout fee</span>
                            <span className="text-gray-900">${formatCurrency(getFee())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">You'll pay</span>
                            <span className="text-gray-900 font-medium">${formatCurrency(getTotalPay())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">They'll receive</span>
                            <span className="text-gray-900 font-medium">${formatCurrency(getPayoutAmountNum())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalStep === 'repeat-config' && (
              <div
                className="flex h-[calc(100%-60px)]"
                onKeyDown={(e) => e.key === 'Enter' && setModalStep('summary')}
              >
                {/* Left side - Repeat config */}
                <div className="flex-1 flex flex-col animate-[slideInRight_0.3s_ease-out]">
                  {/* Scrollable form content */}
                  <div className="flex-1 px-5 pt-2 overflow-y-auto">
                    {/* Date range picker - First and Last instance combined */}
                    <div className="mb-4 relative">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Duration</label>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        {/* Left side - First instance */}
                        <div
                          onClick={() => showFirstInstanceCalendar ? closeFirstInstanceCalendar() : setShowFirstInstanceCalendar(true)}
                          className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 flex-1"
                        >
                          <Icon name="calendar" size="small" fill="#6b7280" />
                          <span className="text-gray-900">
                            {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        {/* Arrow */}
                        <span className="text-gray-400 px-2">→</span>
                        {/* Right side - Last instance */}
                        <div
                          onClick={() => showLastInstanceCalendar ? closeLastInstanceCalendar() : setShowLastInstanceCalendar(true)}
                          className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 flex-1 justify-end"
                        >
                          <span className={`${lastInstanceDate ? 'text-gray-900' : 'text-gray-500'}`}>
                            {lastInstanceDate ? lastInstanceDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Forever'}
                          </span>
                        </div>
                      </div>

                      {/* First instance calendar popup */}
                      {showFirstInstanceCalendar && (
                        <>
                          <div className="fixed inset-0 z-[60]" onClick={closeFirstInstanceCalendar} />
                          <div className={`absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-[70] p-4 w-[300px] ${isFirstInstanceCalendarClosing ? 'animate-[fadeOut_0.15s_ease-out]' : 'animate-[fadeIn_0.2s_ease-out]'}`}>
                            {/* Calendar header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-gray-900">{monthNames[firstInstanceCalendarMonth]} {firstInstanceCalendarYear}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={prevFirstInstanceMonth}
                                  disabled={firstInstanceCalendarMonth === new Date().getMonth() && firstInstanceCalendarYear === new Date().getFullYear()}
                                  className={`p-1 rounded ${firstInstanceCalendarMonth === new Date().getMonth() && firstInstanceCalendarYear === new Date().getFullYear() ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                                >
                                  <Icon name="chevronLeft" size="small" fill="#6b7280" />
                                </button>
                                <button onClick={nextFirstInstanceMonth} className="p-1 hover:bg-gray-100 rounded">
                                  <Icon name="chevronRight" size="small" fill="#6b7280" />
                                </button>
                              </div>
                            </div>

                            {/* Day names */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {dayNames.map((day) => (
                                <div key={day} className="text-center text-sm text-gray-500 py-1">{day}</div>
                              ))}
                            </div>

                            {/* Calendar days */}
                            <div className="grid grid-cols-7 gap-1 h-[228px]">
                              {/* Empty cells for days before the first of the month */}
                              {Array.from({ length: getFirstDayOfMonth(firstInstanceCalendarMonth, firstInstanceCalendarYear) }).map((_, i) => (
                                <div key={`empty-${i}`} className="p-2"></div>
                              ))}
                              {/* Days of the month */}
                              {Array.from({ length: getDaysInMonth(firstInstanceCalendarMonth, firstInstanceCalendarYear) }).map((_, i) => {
                                const day = i + 1
                                const past = isFirstInstancePastDay(day)
                                return (
                                  <button
                                    key={day}
                                    onClick={() => !past && handleFirstInstanceDateSelect(day)}
                                    disabled={past}
                                    className={`p-2 text-sm rounded-lg ${
                                      past
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : isFirstInstanceSelected(day)
                                        ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                                        : isFirstInstanceToday(day)
                                        ? 'text-indigo-600 font-bold hover:bg-gray-100'
                                        : 'text-gray-900 hover:bg-gray-100'
                                    }`}
                                  >
                                    {day}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Last instance calendar popup */}
                      {showLastInstanceCalendar && (
                        <>
                          <div className="fixed inset-0 z-[60]" onClick={closeLastInstanceCalendar} />
                          <div className={`absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-[70] p-4 w-[300px] ${isLastInstanceCalendarClosing ? 'animate-[fadeOut_0.15s_ease-out]' : 'animate-[fadeIn_0.2s_ease-out]'}`}>
                            {/* Calendar header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1">
                                <span className="font-medium text-gray-900">{monthNames[lastInstanceCalendarMonth]} {lastInstanceCalendarYear}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={prevLastInstanceMonth}
                                  disabled={isLastInstanceCurrentMonth()}
                                  className={`p-1 rounded ${isLastInstanceCurrentMonth() ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                                >
                                  <Icon name="chevronLeft" size="small" fill="#6b7280" />
                                </button>
                                <button onClick={nextLastInstanceMonth} className="p-1 hover:bg-gray-100 rounded">
                                  <Icon name="chevronRight" size="small" fill="#6b7280" />
                                </button>
                              </div>
                            </div>

                            {/* Day names */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {dayNames.map((day) => (
                                <div key={day} className="text-center text-sm text-gray-500 py-1">{day}</div>
                              ))}
                            </div>

                            {/* Calendar days */}
                            <div className="grid grid-cols-7 gap-1 h-[228px]">
                              {/* Empty cells for days before the first of the month */}
                              {Array.from({ length: getFirstDayOfMonth(lastInstanceCalendarMonth, lastInstanceCalendarYear) }).map((_, i) => (
                                <div key={`empty-${i}`} className="p-2"></div>
                              ))}
                              {/* Days of the month */}
                              {Array.from({ length: getDaysInMonth(lastInstanceCalendarMonth, lastInstanceCalendarYear) }).map((_, i) => {
                                const day = i + 1
                                const disabled = isLastInstanceDisabledDay(day)
                                return (
                                  <button
                                    key={day}
                                    onClick={() => !disabled && handleLastInstanceDateSelect(day)}
                                    disabled={disabled}
                                    className={`p-2 text-sm rounded-lg ${
                                      disabled
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : isLastInstanceSelected(day)
                                        ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                                        : 'text-gray-900 hover:bg-gray-100'
                                    }`}
                                  >
                                    {day}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                  {/* Cadence */}
                  <div className="mb-3 relative">
                    <label className="block text-sm font-medium text-gray-900 mb-2">Cadence</label>
                    <div
                      onClick={() => setShowCadenceDropdown(!showCadenceDropdown)}
                      className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                    >
                      <span className={`${selectedCadence ? 'text-gray-900' : 'text-gray-500'}`}>
                        {selectedCadence || 'Select cadence'}
                      </span>
                      <Icon name="chevronUpDown" size="small" fill="#6b7280" />
                    </div>
                    {showCadenceDropdown && (
                      <>
                        <div className="fixed inset-0 z-[60]" onClick={() => setShowCadenceDropdown(false)} />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[70]">
                          {['Weekly', 'Monthly', 'Annually', 'Custom'].map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                const wasCustom = customCadence || selectedCadence === 'Custom'
                                setShowCadenceDropdown(false)
                                if (option === 'Custom') {
                                  setSelectedCadence(option)
                                  setCustomCadence(true)
                                } else if (wasCustom) {
                                  setIsCustomCadenceClosing(true)
                                  setTimeout(() => {
                                    setSelectedCadence(option)
                                    setCustomCadence(false)
                                    setIsCustomCadenceClosing(false)
                                  }, 200)
                                } else {
                                  setSelectedCadence(option)
                                  setCustomCadence(false)
                                }
                              }}
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                                selectedCadence === option ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Create custom cadence checkbox */}
                  <div
                    className="flex items-center gap-3 mb-4 cursor-pointer"
                    onClick={() => {
                      const isCurrentlyCustom = customCadence || selectedCadence === 'Custom'
                      if (isCurrentlyCustom) {
                        setIsCustomCadenceClosing(true)
                        setTimeout(() => {
                          setCustomCadence(false)
                          setSelectedCadence(null)
                          setIsCustomCadenceClosing(false)
                        }, 200)
                      } else {
                        setCustomCadence(true)
                        setSelectedCadence('Custom')
                      }
                    }}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${customCadence || selectedCadence === 'Custom' ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                      {(customCadence || selectedCadence === 'Custom') && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-900">Create custom cadence</span>
                  </div>

                  {/* Custom cadence options */}
                  {(customCadence || selectedCadence === 'Custom' || isCustomCadenceClosing) && (
                    <div className={isCustomCadenceClosing ? 'animate-[fadeOut_0.2s_ease-out]' : 'animate-[fadeIn_0.2s_ease-out]'}>
                      {/* Repeat every */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Repeat every</label>
                        <div className="flex gap-3">
                          {/* Number dropdown */}
                          <div className="relative flex-1">
                            <div
                              onClick={() => setShowRepeatNumberDropdown(!showRepeatNumberDropdown)}
                              className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                            >
                              <span className="text-gray-900">{repeatEveryNumber}</span>
                              <Icon name="chevronUpDown" size="small" fill="#6b7280" />
                            </div>
                            {showRepeatNumberDropdown && (
                              <>
                                <div className="fixed inset-0 z-[60]" onClick={() => setShowRepeatNumberDropdown(false)} />
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[70] max-h-48 overflow-y-auto">
                                  {Array.from({ length: repeatEveryPeriod === 'Days' ? 31 : repeatEveryPeriod === 'Weeks' ? 7 : repeatEveryPeriod === 'Months' ? 12 : 10 }, (_, i) => String(i + 1)).map((num) => (
                                    <button
                                      key={num}
                                      onClick={() => {
                                        setRepeatEveryNumber(num)
                                        setShowRepeatNumberDropdown(false)
                                      }}
                                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                        repeatEveryNumber === num ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'
                                      }`}
                                    >
                                      {num}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                          {/* Period dropdown */}
                          <div className="relative flex-1">
                            <div
                              onClick={() => setShowRepeatPeriodDropdown(!showRepeatPeriodDropdown)}
                              className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                            >
                              <span className="text-gray-900">{repeatEveryPeriod}</span>
                              <Icon name="chevronUpDown" size="small" fill="#6b7280" />
                            </div>
                            {showRepeatPeriodDropdown && (
                              <>
                                <div className="fixed inset-0 z-[60]" onClick={() => setShowRepeatPeriodDropdown(false)} />
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[70]">
                                  {['Days', 'Weeks', 'Months', 'Instances'].map((period) => (
                                    <button
                                      key={period}
                                      onClick={() => {
                                        const maxNum = period === 'Days' ? 31 : period === 'Weeks' ? 7 : period === 'Months' ? 12 : 10
                                        if (parseInt(repeatEveryNumber) > maxNum) {
                                          setRepeatEveryNumber('1')
                                        }
                                        setRepeatEveryPeriod(period)
                                        setShowRepeatPeriodDropdown(false)
                                      }}
                                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                        repeatEveryPeriod === period ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'
                                      }`}
                                    >
                                      {period}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Repeats on (days of week) */}
                      {repeatEveryPeriod === 'Weeks' && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-900 mb-2">Repeats on</label>
                          <div className="flex gap-2">
                            {[
                              { key: 'sun', label: 'S' },
                              { key: 'mon', label: 'M' },
                              { key: 'tue', label: 'T' },
                              { key: 'wed', label: 'W' },
                              { key: 'thu', label: 'T' },
                              { key: 'fri', label: 'F' },
                              { key: 'sat', label: 'S' }
                            ].map((day) => (
                              <button
                                key={day.key}
                                onClick={() => {
                                  if (selectedDaysOfWeek.includes(day.key)) {
                                    setSelectedDaysOfWeek(selectedDaysOfWeek.filter(d => d !== day.key))
                                  } else {
                                    setSelectedDaysOfWeek([...selectedDaysOfWeek, day.key])
                                  }
                                }}
                                className={`w-10 h-10 rounded-lg border text-sm font-medium ${
                                  selectedDaysOfWeek.includes(day.key)
                                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    )}
                  </div>

                  {/* Buttons - fixed at bottom */}
                  <div className="flex justify-end gap-3 px-5 pb-4">
                    <button
                      onClick={() => setModalStep('confirm')}
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setModalStep('summary')}
                      className="px-5 py-2 text-sm font-medium text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
                    >
                      Continue
                    </button>
                  </div>
                </div>

                {/* Right side - Preview */}
                <div className="w-1/2 my-4 mr-4 p-4 rounded-2xl flex items-center justify-center" style={{ backgroundImage: 'url(/right-gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="bg-white rounded-xl p-5 shadow-md border-[12px] border-gray-100">
                    <div key={modalStep} className="animate-[fadeIn_0.3s_ease-out]">
                      {/* Review section */}
                      <h3 className="font-semibold text-gray-900 mb-4">Review</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-6 items-start">
                          <span className="text-gray-500 w-28">From</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">S</span>
                            </div>
                            <div>
                              <div className="text-gray-900">Financial account</div>
                              <div className="text-gray-500">USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-6 items-start">
                          <span className="text-gray-500 w-28">To</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 bg-red-700 rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">WF</span>
                            </div>
                            <div>
                              <div className="text-gray-900">Wells Fargo ····{accountNumber.slice(-4) || '1234'}</div>
                              <div className="text-gray-500">USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Method</span>
                          <span className="text-gray-900 flex-1">
                            {selectedMethod === 'email' ? 'Pay via email' : selectedMethod === 'ach' ? 'Standard ACH' : selectedMethod === 'wire' ? 'Wire transfer' : ''}
                          </span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">{selectedDate.toDateString() === new Date().toDateString() ? 'Initiated on' : 'Initiates on'}</span>
                          <span key={`initiates-${selectedDate.getTime()}`} className="text-gray-900 flex-1 animate-[fadeIn_0.2s_ease-out]">{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        {selectedCadence === 'Monthly' && (
                          <div className="flex gap-6 animate-[fadeIn_0.2s_ease-out]">
                            <span className="text-gray-500 w-28">Repeats on</span>
                            <span key={`monthly-${selectedDate.getDate()}`} className="text-gray-900 flex-1 animate-[fadeIn_0.2s_ease-out]">
                              {selectedDate.getDate()}{selectedDate.getDate() === 1 || selectedDate.getDate() === 21 || selectedDate.getDate() === 31 ? 'st' : selectedDate.getDate() === 2 || selectedDate.getDate() === 22 ? 'nd' : selectedDate.getDate() === 3 || selectedDate.getDate() === 23 ? 'rd' : 'th'} of every month
                            </span>
                          </div>
                        )}
                        {selectedCadence === 'Weekly' && (
                          <div className="flex gap-6 animate-[fadeIn_0.2s_ease-out]">
                            <span className="text-gray-500 w-28">Repeats on</span>
                            <span key={`weekly-${selectedDate.getDay()}`} className="text-gray-900 flex-1 animate-[fadeIn_0.2s_ease-out]">
                              Every {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                            </span>
                          </div>
                        )}
                        {selectedCadence === 'Annually' && (
                          <div className="flex gap-6 animate-[fadeIn_0.2s_ease-out]">
                            <span className="text-gray-500 w-28">Repeats on</span>
                            <span key={`annually-${selectedDate.getMonth()}-${selectedDate.getDate()}`} className="text-gray-900 flex-1 animate-[fadeIn_0.2s_ease-out]">
                              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, every year
                            </span>
                          </div>
                        )}
                        {(selectedCadence === 'Monthly' || selectedCadence === 'Weekly' || selectedCadence === 'Annually') && lastInstanceDate && (
                          <div className="flex gap-6 animate-[fadeIn_0.2s_ease-out]">
                            <span className="text-gray-500 w-28">Ends on</span>
                            <span key={`ends-${lastInstanceDate.getTime()}`} className="text-gray-900 flex-1 animate-[fadeIn_0.2s_ease-out]">{lastInstanceDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        )}
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Estimated arrival</span>
                          <span className="text-gray-900 flex-1">
                            {selectedMethod === 'email' ? 'Minutes' : selectedMethod === 'ach' ? '2-3 business days' : selectedMethod === 'wire' ? 'Minutes' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Fees section */}
                      <div className="border-t border-gray-100 mt-5 pt-5">
                        <h3 className="font-semibold text-gray-900 mb-2">Fees per payout</h3>
                        <p className="text-sm text-gray-500 mb-3">Fees are collected separately from your balance at the end of each day.</p>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Payout amount</span>
                            <span className="text-gray-900">${formatCurrency(getPayoutAmountNum())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Standard payout fee</span>
                            <span className="text-gray-900">${formatCurrency(getFee())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">You'll pay</span>
                            <span className="text-gray-900 font-medium">${formatCurrency(getTotalPay())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">They'll receive</span>
                            <span className="text-gray-900 font-medium">${formatCurrency(getPayoutAmountNum())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalStep === 'summary' && (
              <div
                className="flex h-[calc(100%-60px)]"
                onKeyDown={(e) => { if (e.key === 'Enter') { createScheduledPayout(); setModalStep('success'); } }}
              >
                {/* Left side - Summary */}
                <div className="flex-1 flex flex-col animate-[slideInRight_0.3s_ease-out]">
                  {/* Scrollable form content */}
                  <div className="flex-1 px-5 pt-2 overflow-y-auto">
                    {/* Amount display */}
                    <div className="mb-1">
                      <span className="text-5xl font-medium text-gray-900">${formatCurrency(getPayoutAmountNum())}</span>
                    </div>
                    <div className="text-gray-500 mb-6">
                      to {businessType === 'individual' ? `${legalFirstName} ${legalLastName}` : 'Cosmo Kramer'}
                    </div>

                    {/* Internal note section */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">Internal note</span>
                        <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded">Optional</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Description"
                        value={internalNote}
                        onChange={(e) => setInternalNote(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                      />
                    </div>

                    {/* Statement descriptor section */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">Statement descriptor</span>
                          <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded">Optional</span>
                        </div>
                        <div className="relative group">
                          <Icon name="info" size="small" fill="#9ca3af" className="cursor-help" />
                          <div className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <p className="text-sm text-gray-700">This is the text you will see on your bank statement. You can also configure an account-level statement descriptor for all your payouts in <a href="#" className="text-indigo-600 hover:text-indigo-700">Settings</a></p>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Statement descriptor"
                        value={statementDescriptor}
                        onChange={(e) => setStatementDescriptor(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
                      />
                    </div>

                    {/* Notify recipient checkbox */}
                    <div
                      className="flex items-start gap-3 mb-4 cursor-pointer"
                      onClick={() => setNotifyRecipient(!notifyRecipient)}
                    >
                      <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center ${notifyRecipient ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                        {notifyRecipient && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Notify recipient</div>
                        <div className="text-sm text-gray-500">Send a payment confirmation to {recipientEmail || 'jbrealey@stripe.com'}</div>
                      </div>
                    </div>

                    {/* Payroll payment checkbox */}
                    <div
                      className="flex items-start gap-3 mb-6 cursor-pointer"
                      onClick={() => setIsPayrollPayment(!isPayrollPayment)}
                    >
                      <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center ${isPayrollPayment ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                        {isPayrollPayment && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">This is a payroll payment</div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons - fixed at bottom */}
                  <div className="flex justify-end gap-3 px-5 pb-4">
                    <button
                      onClick={() => setModalStep('confirm')}
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        createScheduledPayout()
                        setModalStep('success')
                      }}
                      className="px-5 py-2 text-sm font-medium text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
                    >
                      {repeatPayout ? 'Create payout' : 'Schedule'}
                    </button>
                  </div>
                </div>

                {/* Right side - Preview */}
                <div className="w-1/2 my-4 mr-4 p-4 rounded-2xl flex items-center justify-center" style={{ backgroundImage: 'url(/summary-gradient.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="bg-white rounded-xl p-5 shadow-md border-[12px] border-gray-100">
                    <div key={modalStep} className="animate-[fadeIn_0.3s_ease-out]">
                      {/* Review section */}
                      <h3 className="font-semibold text-gray-900 mb-4">Review</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-6 items-start">
                          <span className="text-gray-500 w-28">From</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">S</span>
                            </div>
                            <div>
                              <div className="text-gray-900">Financial account</div>
                              <div className="text-gray-500">USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-6 items-start">
                          <span className="text-gray-500 w-28">To</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 bg-red-700 rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">WF</span>
                            </div>
                            <div>
                              <div className="text-gray-900">Wells Fargo ····{accountNumber.slice(-4) || '1234'}</div>
                              <div className="text-gray-500">USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Method</span>
                          <span className="text-gray-900 flex-1">
                            {selectedMethod === 'email' ? 'Pay via email' : selectedMethod === 'ach' ? 'Standard ACH' : selectedMethod === 'wire' ? 'Wire transfer' : ''}
                          </span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">{selectedDate.toDateString() === new Date().toDateString() ? 'Initiated on' : 'Initiates on'}</span>
                          <span className="text-gray-900 flex-1">{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        {repeatPayout && selectedCadence === 'Monthly' && (
                          <div className="flex gap-6">
                            <span className="text-gray-500 w-28">Repeats on</span>
                            <span className="text-gray-900 flex-1">
                              {selectedDate.getDate()}{selectedDate.getDate() === 1 || selectedDate.getDate() === 21 || selectedDate.getDate() === 31 ? 'st' : selectedDate.getDate() === 2 || selectedDate.getDate() === 22 ? 'nd' : selectedDate.getDate() === 3 || selectedDate.getDate() === 23 ? 'rd' : 'th'} of every month
                            </span>
                          </div>
                        )}
                        {repeatPayout && selectedCadence === 'Weekly' && (
                          <div className="flex gap-6">
                            <span className="text-gray-500 w-28">Repeats on</span>
                            <span className="text-gray-900 flex-1">
                              Every {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                            </span>
                          </div>
                        )}
                        {repeatPayout && selectedCadence === 'Annually' && (
                          <div className="flex gap-6">
                            <span className="text-gray-500 w-28">Repeats on</span>
                            <span className="text-gray-900 flex-1">
                              {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, every year
                            </span>
                          </div>
                        )}
                        {repeatPayout && lastInstanceDate && (
                          <div className="flex gap-6">
                            <span className="text-gray-500 w-28">Ends on</span>
                            <span className="text-gray-900 flex-1">{lastInstanceDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        )}
                        <div className="flex gap-6">
                          <span className="text-gray-500 w-28">Estimated arrival</span>
                          <span className="text-gray-900 flex-1">
                            {selectedMethod === 'email' ? 'Minutes' : selectedMethod === 'ach' ? '2-3 business days' : selectedMethod === 'wire' ? 'Minutes' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Fees section */}
                      <div className="border-t border-gray-100 mt-5 pt-5">
                        <h3 className="font-semibold text-gray-900 mb-2">{repeatPayout ? 'Fees per payout' : 'Fees'}</h3>
                        <p className="text-sm text-gray-500 mb-3">Fees are collected separately from your balance at the end of each day.</p>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Payout amount</span>
                            <span className="text-gray-900">${formatCurrency(getPayoutAmountNum())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Standard payout fee</span>
                            <span className="text-gray-900">${formatCurrency(getFee())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">You'll pay</span>
                            <span className="text-gray-900 font-medium">${formatCurrency(getTotalPay())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">They'll receive</span>
                            <span className="text-gray-900 font-medium">${formatCurrency(getPayoutAmountNum())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modalStep === 'success' && (
              <div className="px-5 pb-5 animate-[fadeIn_0.3s_ease-out]">
                {/* Green checkmark */}
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Success message */}
                <h2 className="text-2xl font-medium text-gray-900 mb-2">
                  US${formatCurrency(getPayoutAmountNum())} {repeatPayout ? 'Repeating payout is created to send to' : 'is scheduled to send to'} <span className="text-indigo-600">{recipientEmail || 'jbrealey@stripe.com'}</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  This payout should arrive on {(() => {
                    const arrivalDate = new Date(selectedDate)
                    if (selectedMethod === 'ach') {
                      arrivalDate.setDate(arrivalDate.getDate() + 3)
                    }
                    return arrivalDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                  })()}.
                </p>

                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <button className="text-red-600 text-sm font-medium hover:text-red-700">
                    Cancel payout
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setPayoutDetails({
                          amount: getPayoutAmountNum(),
                          fee: getFee(),
                          total: getTotalPay(),
                          recipientName: isExistingRecipient ? selectedRecipientName : businessType === 'individual' ? `${legalFirstName} ${legalLastName}` : 'Cosmo Kramer',
                          recipientEmail: recipientEmail || 'cosmokramer@gmail.com',
                          initiatesOn: new Date(selectedDate),
                          accountLast4: accountNumber.slice(-4) || '1234',
                          method: selectedMethod,
                          transactionId: `obp_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`,
                          traceId: `${Math.floor(Math.random() * 90000000) + 10000000}_${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
                          reference: internalNote || 'Software services',
                          isRepeating: repeatPayout,
                          cadence: selectedCadence,
                          endsOn: lastInstanceDate,
                          statementDescriptor: statementDescriptor,
                          notifyRecipient: notifyRecipient,
                          isPayrollPayment: isPayrollPayment
                        })
                        setShowSendModal(false)
                        setShowPayoutDetails(true)
                        document.body.style.overflow = ''
                      }}
                      className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      View payout
                    </button>
                    <button
                      onClick={closeSendModal}
                      className="px-5 py-2 text-sm font-medium text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
