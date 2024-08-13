import { BaseCache } from "@langchain/core/caches";
import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";
import { ICommonObject, INode, INodeData, INodeParams } from "../../../src/Interface";
import { getBaseClasses, getCredentialData, getCredentialParam } from "../../../src/utils";

class ChatAliQwen_ChatModels implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'ChatAliQwen'
        this.name = 'chatAliQwen'
        this.version = 1.0
        this.type = 'ChatAliQwen'
        this.icon = 'aliqwen.svg'
        this.category = 'Chat Models'
        this.description = 'Wrapper around Alibaba Qwen Chat Endpoints'
        this.baseClasses = [this.type, ...getBaseClasses(ChatAlibabaTongyi)]
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['alibabaApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model',
                name: 'modelName',
                type: 'string',
                placeholder: 'qwen-turbo'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const cache = nodeData.inputs?.cache as BaseCache
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const alibabaApiKey = getCredentialParam('alibabaApiKey', credentialData, nodeData)

        const obj: Partial<ChatAlibabaTongyi> = {
            streaming: true,
            alibabaApiKey,
            modelName,
            temperature: temperature ? parseFloat(temperature) : undefined
        }
        if (cache) obj.cache = cache

        return new ChatAlibabaTongyi(obj)
    }
}

module.exports = { nodeClass: ChatAliQwen_ChatModels }
