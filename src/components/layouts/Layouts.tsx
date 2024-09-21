import { useMemo, lazy, Suspense, useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import { commonActions, useAppDispatch, useAppSelector } from '@/store'
import useDirection from '@/utils/hooks/useDirection'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const Layout = () => {
  const layoutType = useAppSelector((state) => state.theme.layout.type)
  const notification = useAppSelector((state) => state.base.common.notification)
  const signedIn = useAppSelector((state) => state.auth.session.signedIn)
  const dispatch = useAppDispatch()

  useDirection()

  const AppLayout = useMemo(() => {
    if (signedIn) {
      return lazy(() => import('./ModernLayout'))
    }
    return lazy(() => import('./AuthLayout'))
  }, [layoutType, signedIn])

  useEffect(() => {
    if (!notification.visibility) {
      return
    }
    toast.push(
      <Notification
        title={notification.title}
        type={notification.type ?? 'success'}
        duration={notification?.duration ?? 5000}
        onClose={() => dispatch(commonActions.hidenCommonNotification())}
      >
        {notification.message}
      </Notification>,
      {
        placement: notification?.placement ?? 'top-end',
      },
    )
  }, [
    dispatch,
    notification.message,
    notification.title,
    notification.type,
    notification.visibility,
    notification.placement,
    notification.duration,
  ])

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      <AppLayout />
    </Suspense>
  )
}

export default Layout
