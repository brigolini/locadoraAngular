exports.Schema = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            required: true
        },
        placa: {
            type: 'string',
            required: true,
            size:7
        },
        chassi: {
            type: 'string',
            required: true,
            size:7
        },
        renavam: {
            type: 'number',
            required: true,
            size:8
        },
        modelo: {
            type: 'string',
            required: true,
            size:80
        },
        marca: {
            type: 'string',
            required: true,
            size:80
        },
        ano: {
            type: 'number',
            required: true,
            size:4
        }
    }
}
