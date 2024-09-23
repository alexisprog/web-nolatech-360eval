import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { sessionAction, useAppDispatch } from '@/store'

interface SignInFormProps {
  signUpUrl?: string
}

type SignInFormSchema = {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
})

const SignInForm = (props: SignInFormProps) => {
  const { signUpUrl = '/sign-up' } = props

  const dispatch = useAppDispatch()

  const onSignIn = async (
    values: SignInFormSchema,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true)
    dispatch(sessionAction.singInAction(values))
    setSubmitting(false)
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSignIn(values, setSubmitting)
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Email"
                invalid={(errors.email && touched.email) as boolean}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="email@domain.com"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Password"
                invalid={(errors.password && touched.password) as boolean}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                />
              </FormItem>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="mt-4 text-center">
                <span>{`Don't have an account yet?`} </span>
                <ActionLink to={signUpUrl}>Sign up</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignInForm
