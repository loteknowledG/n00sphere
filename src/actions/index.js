

export const addPlay = (store, play) => {   
  store.setState({ mainStageIdx: store.state.plays.length})
  console.log(store.state.mainStageIdx)
  store.state.plays.push(play)
  
}

export const getPlay = (store) => {
  return store.state.plays[store.state.playIdx]
}

export const getMainStage = (store) => {
  console.log(store.state.plays[store.state.mainStageIdx])
  return store.state.plays[store.state.mainStageIdx]
}

export const getTuning = (store) => {
  return store.state.now.tune
}

export const setPlayIdx = (store, playIdx) => {
  store.setState({playIdx})
}

export const setMainStageIdx = (store, mainStageIdx) => {
  store.setState({ mainStageIdx })
}

export const setProfileToken = (store, profileToken) => {
  store.setState({ profileToken })
}


export const setTitle = (store, title) => {
  store.state.level.title = title  
}
