

export async function back(params,to) {
    // const _this=params
    console.log(this)
    const {history}=params.props
     return  history.push(to)
  }