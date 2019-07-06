import React from 'react'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonLoading,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { helpCircle, logoTwitter, refresh } from 'ionicons/icons'

const fetchImage = async () => {
  const request = await window.fetch('https://dog.ceo/api/breeds/image/random')
  const { message } = await request.json()
  return message
}

const RootPage = () => {
  const [showLoading, setShowLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [dogUrl, setDogUrl] = React.useState('')

  React.useEffect(() => {
    ;(async () => {
      setDogUrl(await fetchImage())
      setShowLoading(false)
    })()
  }, [])

  return (
    <>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Dog Viewer</IonTitle>
          <IonButtons slot='end'>
            <IonButton
              icon-only
              onClick={() => {
                setShowModal(true)
              }}
            >
              <IonIcon slot='icon-only' icon={helpCircle} />
            </IonButton>
            {window.navigator.share && (
              <IonButton
                icon-only
                onClick={() => {
                  window.navigator.share({ url: dogUrl })
                }}
              >
                <IonIcon slot='icon-only' icon={logoTwitter} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent slot='fixed'>
        {dogUrl && <IonImg src={dogUrl} style={{ height: '100%' }} />}
        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton
            onClick={async () => {
              setDogUrl(await fetchImage())
            }}
          >
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
        <IonLoading
          isOpen={showLoading}
          message='Loading...'
          onDidDismiss={() => {}}
        />
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => {
            setShowModal(false)
          }}
        >
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>About</IonTitle>
                <IonButtons slot='end'>
                  <IonButton
                    onClick={() => {
                      setShowModal(false)
                    }}
                  >
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
              <p>
                Dog images from <a href='https://dog.ceo/dog-api/'>Dog API</a>.
              </p>
              <p>
                This app is created with Ionic React.{' '}
                <a href='https://github.com/likr-sandbox/dog-viewer'>
                  view source
                </a>
              </p>
            </IonContent>
          </IonPage>
        </IonModal>
      </IonContent>
    </>
  )
}

export default RootPage
