import React from 'react';
import { Card, CardContent, Typography} from "@material-ui/core";

function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title" color = "textSecondary">
                    {title}                    
                </Typography>
                    
                {/* No Of Cases */}
                    <h2 className="infoBox__cases">{cases}</h2>

                {/* number Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
