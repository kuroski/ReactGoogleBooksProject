import styled from 'styled-components'

const Message = styled.div`
    font-family: Roboto;
    text-align: center;
    background-color: #6D7993;
    padding: .5rem;
    color: white;

    &:empty {
        display: none;
    }
`

export default Message