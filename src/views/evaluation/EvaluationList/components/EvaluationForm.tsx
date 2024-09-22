import { useEffect, useMemo } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { Field, Form, Formik, FieldProps, FormikProps } from 'formik'
import { useAppDispatch, useAppSelector } from '@/store'
import * as Yup from 'yup'
import { evaluationActions } from '@/store/slices/evaluation'
import { employeeActions } from '@/store/slices/employee'
import { competencyActions } from '@/store/slices/competency'

type FormModel = {
  hierarchy: string
  evaluated_by: string
  employee: string
}

type TypeOption = {
  value: string
  label: string
}

const validationSchema = Yup.object().shape({
  hierarchy: Yup.string().required('Hierarchy required'),
  evaluated_by: Yup.string().required('Evaluated by required'),
  employee: Yup.string().required('Employee required'),
})

const EvaluationForm = () => {
  const currentEvaluation = useAppSelector(
    (state) => state.evaluation.list.currentEvaluation,
  )
  const { data } = useAppSelector((state) => state.employee)
  const { data: competencies } = useAppSelector((state) => state.competency)
  const dispatch = useAppDispatch()

  useEffect(() => {
    Promise.all([
      dispatch(employeeActions.getEmployeesActions()),
      dispatch(competencyActions.getCompetenciesActions()),
    ])
  }, [dispatch])

  const employeeOptions: TypeOption[] = useMemo(() => {
    return data.map((employee) => {
      return {
        value: employee._id,
        label: `${employee.first_name} ${employee.last_name} - ${employee.position}`,
      }
    })
  }, [data])

  const hierarchyOptions: TypeOption[] = useMemo(() => {
    return [
      { value: 'coworker', label: 'COWORKER' },
      { value: 'manager', label: 'MANAGER' },
      { value: 'self-assessment', label: 'SELF-ASSESSMENT' },
    ]
  }, [])

  const onSubmit = (
    formValue: FormModel,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true)
    if (currentEvaluation?._id) {
      dispatch(
        evaluationActions.setEvaluationUpdateAction({
          id: currentEvaluation._id,
          data: {
            ...formValue,
            competencies: competencies
              .filter((c) => !c.is_disabled)
              .map((c) => c._id),
          },
        }),
      )
    } else {
      dispatch(
        evaluationActions.setEvaluationCreateAction({
          ...formValue,
          competencies: competencies
            .filter((c) => !c.is_disabled)
            .map((c) => c._id),
        }),
      )
    }

    dispatch(evaluationActions.toggleModal(false))
  }

  const validateHierarchy = (
    values: FormModel,
    form: FormikProps<FormModel>,
  ) => {
    if (values.employee === values.evaluated_by) {
      form.setFieldValue('hierarchy', 'self-assessment')
    }
  }

  return (
    <Formik
      initialValues={{
        hierarchy: currentEvaluation?.hierarchy ?? 'coworker',
        evaluated_by: currentEvaluation?.evaluated_by._id ?? '',
        employee: currentEvaluation?.employee._id ?? '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting)
      }}
    >
      {({ touched, errors, values }) => (
        <Form>
          <FormContainer>
            <FormItem
              label="Employee (Evaluated):"
              invalid={(errors.employee && touched.employee) as ''}
              errorMessage={errors.employee as string}
            >
              <Field name="employee">
                {({ field, form }: FieldProps) => (
                  <Select<TypeOption>
                    className="min-w-[120px]"
                    field={field}
                    form={form}
                    options={employeeOptions}
                    value={employeeOptions.filter(
                      (option) => option.value === values.employee,
                    )}
                    onChange={(option) => {
                      form.setFieldValue(field.name, option?.value)
                      validateHierarchy(values, form)
                    }}
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Evaluated By:"
              invalid={(errors.evaluated_by && touched.evaluated_by) as ''}
              errorMessage={errors.evaluated_by as string}
            >
              <Field name="evaluated_by">
                {({ field, form }: FieldProps) => (
                  <Select<TypeOption>
                    className="min-w-[120px]"
                    field={field}
                    form={form}
                    options={employeeOptions}
                    value={employeeOptions.filter(
                      (option) => option.value === values.evaluated_by,
                    )}
                    onChange={(option) => {
                      form.setFieldValue(field.name, option?.value)
                      validateHierarchy(values, form)
                    }}
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Hierarchy:"
              invalid={(errors.hierarchy && touched.hierarchy) as ''}
              errorMessage={errors.hierarchy as string}
            >
              <Field name="hierarchy">
                {({ field, form }: FieldProps) => (
                  <Select<TypeOption>
                    className="min-w-[120px]"
                    field={field}
                    form={form}
                    options={hierarchyOptions}
                    value={hierarchyOptions.filter(
                      (option) => option.value === values.hierarchy,
                    )}
                    onChange={(option) => {
                      form.setFieldValue(field.name, option?.value)
                      validateHierarchy(values, form)
                    }}
                  />
                )}
              </Field>
            </FormItem>
            <h6 className="mt-5 mb-5">Competencies to evaluate:</h6>
            {competencies
              ?.filter((c) => !c.is_disabled)
              .map((competency, index) => (
                <div key={index} className="mb-2 card-border p-2 rounded-lg">
                  <p className="font-semibold">{competency.competence}</p>
                  <p>{competency.definition}</p>
                </div>
              ))}

            <Button className="mt-5" block variant="solid" type="submit">
              Create evaluation
            </Button>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
}

export default EvaluationForm
