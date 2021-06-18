import DiaLog from 'Dialog'
import React from 'react'
function useNotificationSignDiaLog () {
  const [visible,setVisible] = useState(false)
  useEffect(() => {
    const currentTime = (new Date()).getDate()
    const originTime = localStorage.getItem('time');
    if (currentTime === originTime) {
      this.visible = false
    } else {
      this.visible = true;
    }
  },[])
  function onOk () {
    history.push('https://tmall.com/sign-11-protocol')
    this.visible = false;
  }
  function onCancel () {
    const date = new Date()
    localStorage.setItem('time', date.getDate())
  }
  return (<DiaLog
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  />)
}