import React from 'react';

import {Achievement} from '../../server/models/Achievement';

interface AchievementsProps {
    achievements: Achievement[];
}

export default function Achievements({achievements}: AchievementsProps) {
    return (
        <div className="scene-page__achievements">
            {
                achievements.map(achievement =>
                    (
                        <div className="scene-page__achievement" key={achievement.id}>
                            <img src={achievement.picture} alt="achievement"
                                 className="scene-page__achievement-picture"/>
                            <div className="scene-page__achievement-texts">
                                <p className="scene-page__achievement-get">
                                    Достижение получено
                                </p>
                                <p className="scene-page__achievement-name">
                                    {achievement.text}
                                </p>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
}
