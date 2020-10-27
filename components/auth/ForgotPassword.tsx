import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Logo, Button, Input } from '@components/ui'
import useSignup from '@lib/bigcommerce/use-signup'

interface Props {}

const ForgotPassword: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const signup = useSignup()
  const { setModalView, closeModal } = useUI()

  const handleSignup = async () => {
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    // try {
    //   setLoading(true)
    //   setMessage('')
    //   await signup({
    //     email,
    //   })
    //   setLoading(false)
    //   closeModal()
    // } catch ({ errors }) {
    //   setMessage(errors[0].message)
    //   setLoading(false)
    // }
  }

  const handleValidation = useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email))
    }
  }, [email, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div className="w-80 flex flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}

        <Input placeholder="Email" onChange={setEmail} type="email" />
        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            onClick={() => handleSignup()}
            loading={loading}
            disabled={disabled}
          >
            Recover Password
          </Button>
        </div>

        <span className="pt-3 text-center text-sm">
          <span className="text-accents-7">Do you have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            Log In
          </a>
        </span>
      </div>
    </div>
  )
}

export default ForgotPassword