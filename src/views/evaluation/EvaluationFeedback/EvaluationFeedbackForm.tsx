import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { Field, FieldArray, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/store'
import FormDesription from './components/FormDesription'
import FormRow from './components/FormRow'
import Select from '@/components/ui/Select'
import { useCallback, useEffect, useMemo } from 'react'
import { scaleActions } from '@/store/slices/scale'

type ScaleOption = {
  value: number
  label: string
}

interface EvaluationFeedbackFormProps {
  goBackUrl?: string
}

export type EvaluationFeedbackFormSchema = {
  feedbacks: {
    competency: string
    value: number
  }[]
}

const validationSchema = Yup.object().shape({
  feedbacks: Yup.array().of(
    Yup.object().shape({
      competency: Yup.string().required(),
      value: Yup.number().required(),
    }),
  ),
})

const EvaluationFeedbackForm = (props: EvaluationFeedbackFormProps) => {
  const { goBackUrl } = props
  const currentPending = useAppSelector(
    (state) => state.evaluation.pending.currentPending,
  )
  const { scales } = useAppSelector((state) => state.scale)
  const distpatch = useAppDispatch()

  const scaleOptions: ScaleOption[] = useMemo(() => {
    return scales.map((scale) => {
      return {
        value: scale.points,
        label: scale.description,
      }
    })
  }, [scales])

  const onEvaluationFeedback = async (
    values: EvaluationFeedbackFormSchema,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true)
    console.log({ values })
    setSubmitting(false)
  }

  const fetchScales = useCallback(() => {
    distpatch(scaleActions.getScalesAction())
  }, [distpatch])

  useEffect(() => {
    fetchScales()
  }, [])

  if (!currentPending || scales.length === 0) {
    return null
  }

  return (
    <div>
      <Formik
        initialValues={{
          feedbacks: currentPending.competencies.map((competence) => {
            return {
              competency: competence._id,
              value: 1,
            }
          }),
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onEvaluationFeedback(values, setSubmitting)
        }}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <FormDesription
                  title="Feedback"
                  desc="Complete the answers by selecting an option for each competency, then press the feedback button to send."
                  name={`${currentPending.employee.first_name} ${currentPending.employee.last_name}`}
                  dni={currentPending.employee.dni}
                  hierarchy={currentPending.hierarchy}
                  position={currentPending.employee.position}
                  updatedAt={currentPending.updatedAt}
                />
                <FieldArray
                  name="feedbacks"
                  render={() => (
                    <div>
                      {values.feedbacks.map((feedback, index) => (
                        <FormRow
                          key={index}
                          title={
                            currentPending.competencies.find(
                              (comp) => comp._id === feedback.competency,
                            )?.competence ?? ''
                          }
                          subtitle={
                            currentPending.competencies.find(
                              (comp) => comp._id === feedback.competency,
                            )?.definition ?? ''
                          }
                        >
                          <Field name={`feedbacks[${index}].value`}>
                            {({ field, form }: FieldProps) => (
                              <Select<ScaleOption>
                                field={field}
                                form={form}
                                options={scaleOptions}
                                value={scaleOptions.filter(
                                  (option) =>
                                    Number(option.value) ===
                                    values?.feedbacks[index].value,
                                )}
                                onChange={(option) =>
                                  form.setFieldValue(field.name, option?.value)
                                }
                              />
                            )}
                          </Field>
                        </FormRow>
                      ))}
                    </div>
                  )}
                />

                <div className="mt-4 ltr:text-right">
                  <ActionLink className="mr-8" to={goBackUrl}>
                    Go back
                  </ActionLink>
                  <Button variant="solid" loading={isSubmitting} type="submit">
                    {isSubmitting ? 'Loading...' : 'Feedback'}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default EvaluationFeedbackForm
