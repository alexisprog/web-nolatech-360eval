import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

interface SignUpFormProps {
  signInUrl?: string
}

type SignUpFormSchema = {
  userName: string
  password: string
  email: string
}

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Please enter your user name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Your passwords do not match',
  ),
})

const SignUpForm = (props: SignUpFormProps) => {
  const { signInUrl = '/sign-in' } = props

  const onSignUp = async (
    values: SignUpFormSchema,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true)
    setSubmitting(false)
  }

  return (
    <div>
      <Formik
        initialValues={{
          userName: 'admin1',
          password: '123Qwe1',
          confirmPassword: '123Qwe1',
          email: 'test@testmail.com',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSignUp(values, setSubmitting)
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="User Name"
                invalid={errors.userName && touched.userName}
                errorMessage={errors.userName}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="userName"
                  placeholder="User Name"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                />
              </FormItem>
              <FormItem
                label="Confirm Password"
                invalid={errors.confirmPassword && touched.confirmPassword}
                errorMessage={errors.confirmPassword}
              >
                <Field
                  autoComplete="off"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  component={PasswordInput}
                />
              </FormItem>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <div className="mt-4 text-center">
                <span>Already have an account? </span>
                <ActionLink to={signInUrl}>Sign in</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm
