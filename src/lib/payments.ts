/** Manual MB Way payment constants for PropostaJá Pro */

export const PRO_PRICE_LABEL = '9,90€'

export const MBWAY_PHONE_DIGITS = '913554990'
export const MBWAY_PHONE_DISPLAY = '913 554 990'

export const ACTIVATION_CODE = 'PROJA990'

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Já paguei 9,90€ por MB Way para o PropostaJá Pro e quero ativar a minha conta. Obrigado!',
)

export const WHATSAPP_URL = `https://wa.me/351${MBWAY_PHONE_DIGITS}?text=${WHATSAPP_MESSAGE}`
