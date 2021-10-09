import { Card, CardContent, CardHeader, Typography } from "@material-ui/core"

const AssetCard = props => {
    
    return (
        <Card>
            <CardHeader
                title={props.title}
                subheader={props.subheader}
                action={props.action}
            />

            <CardContent>
                <Typography>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident, 
                    suscipit pariatur. Magni sapiente ducimus distinctio reprehenderit veritatis 
                    enim eveniet inventore, laboriosam, ex aperiam culpa obcaecati dolor. Ab 
                    deserunt unde praesentium!
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AssetCard