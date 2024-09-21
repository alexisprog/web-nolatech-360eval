import { Notification, toast } from '@/components/ui'

export const successMessage = (title: string, description: string) => {
    toast.push(
        <Notification title={title} type="success">
            {description}
        </Notification>,
        {
            placement: 'top-center',
        },
    )
}

export const failedMessage = (title: string, description: string) => {
    toast.push(
        <Notification title={title} type="danger" duration={2000}>
            {description}
        </Notification>,
        {
            placement: 'top-center',
        },
    )
}
