import styled from 'styled-components'

const Message = styled.div`
    font-family: Roboto;
    text-align: center;
    background-color: #212121;
    padding: .5rem;
    color: white;

    &:empty {
        display: none;
    }
`

export default Message