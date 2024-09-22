import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { SignUpRequest } from '@/@types/auth'
import { sessionAction, useAppDispatch } from '@/store'

interface SignUpFormProps {
  signInUrl?: string
}

export type SignUpFormSchema = {
  dni: string
  first_name: string
  last_name: string
  position: string
  email: string
  password: string
  confirmPassword?: string
}

const validationSchema = Yup.object().shape({
  dni: Yup.string().required('Please enter your DNI'),
  first_name: Yup.string().required('Please enter your first name'),
  last_name: Yup.string().required('Please enter your last name'),
  position: Yup.string().required('Please enter your position'),
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
  const distpatch = useAppDispatch()

  const onSignUp = async (
    values: SignUpFormSchema,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true)
    delete values.confirmPassword
    distpatch(sessionAction.singUpAction(values as SignUpRequest))
    setSubmitting(false)
  }

  return (
    <div>
      <Formik
        initialValues={{
          dni: '',
          first_name: '',
          last_name: '',
          password: '',
          confirmPassword: '',
          email: '',
          position: '',
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
                label="DNI (identification number - passport)"
                invalid={errors.dni && touched.dni}
                errorMessage={errors.dni}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="dni"
                  placeholder="12435436546"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="First Name"
                invalid={errors.first_name && touched.first_name}
                errorMessage={errors.first_name}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="first_name"
                  placeholder="Jon"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Last Name"
                invalid={errors.last_name && touched.last_name}
                errorMessage={errors.last_name}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="last_name"
                  placeholder="Due"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Position"
                invalid={errors.position && touched.position}
                errorMessage={errors.position}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="position"
                  placeholder="Fullstack developer"
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
              <div className="mt-4 mb-5 text-center">
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
