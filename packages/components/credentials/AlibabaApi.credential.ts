import { INodeParams, INodeCredential } from '../src/Interface'

class AlibabaApi implements INodeCredential {
    label: string
    name: string
    version: number
    inputs: INodeParams[]

    constructor() {
        this.label = 'Alibaba API'
        this.name = 'alibabaApi'
        this.version = 1.0
        this.inputs = [
            {
                label: 'Alibaba Api Secret',
                name: 'alibabaApiKey',
                type: 'password',
                placeholder: '<ALIBABA_API_SECRECT>'
            }
        ]
    }
}

module.exports = { credClass: AlibabaApi }
