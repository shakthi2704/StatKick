-- CreateIndex
CREATE INDEX "Coach_name_idx" ON "Coach"("name");

-- CreateIndex
CREATE INDEX "Coach_teamId_idx" ON "Coach"("teamId");

-- CreateIndex
CREATE INDEX "CoachCareer_coachId_idx" ON "CoachCareer"("coachId");

-- CreateIndex
CREATE INDEX "CoachCareer_teamId_idx" ON "CoachCareer"("teamId");

-- CreateIndex
CREATE INDEX "Country_name_idx" ON "Country"("name");

-- CreateIndex
CREATE INDEX "Country_code_idx" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Fixture_leagueId_idx" ON "Fixture"("leagueId");

-- CreateIndex
CREATE INDEX "Fixture_seasonId_idx" ON "Fixture"("seasonId");

-- CreateIndex
CREATE INDEX "Fixture_homeTeamId_idx" ON "Fixture"("homeTeamId");

-- CreateIndex
CREATE INDEX "Fixture_awayTeamId_idx" ON "Fixture"("awayTeamId");

-- CreateIndex
CREATE INDEX "Fixture_venueId_idx" ON "Fixture"("venueId");

-- CreateIndex
CREATE INDEX "FootballAssociation_name_idx" ON "FootballAssociation"("name");

-- CreateIndex
CREATE INDEX "FootballAssociation_code_idx" ON "FootballAssociation"("code");

-- CreateIndex
CREATE INDEX "FootballAssociationCountry_associationId_idx" ON "FootballAssociationCountry"("associationId");

-- CreateIndex
CREATE INDEX "FootballAssociationCountry_countryId_idx" ON "FootballAssociationCountry"("countryId");

-- CreateIndex
CREATE INDEX "League_name_idx" ON "League"("name");

-- CreateIndex
CREATE INDEX "League_countryId_idx" ON "League"("countryId");

-- CreateIndex
CREATE INDEX "LeagueSeason_leagueId_idx" ON "LeagueSeason"("leagueId");

-- CreateIndex
CREATE INDEX "LeagueSeason_seasonId_idx" ON "LeagueSeason"("seasonId");

-- CreateIndex
CREATE INDEX "MatchLineup_fixtureId_idx" ON "MatchLineup"("fixtureId");

-- CreateIndex
CREATE INDEX "MatchLineup_teamId_idx" ON "MatchLineup"("teamId");

-- CreateIndex
CREATE INDEX "MatchLineup_playerId_idx" ON "MatchLineup"("playerId");

-- CreateIndex
CREATE INDEX "Player_name_idx" ON "Player"("name");

-- CreateIndex
CREATE INDEX "Player_birthCountry_idx" ON "Player"("birthCountry");

-- CreateIndex
CREATE INDEX "Player_nationality_idx" ON "Player"("nationality");

-- CreateIndex
CREATE INDEX "PlayerSidelined_playerId_idx" ON "PlayerSidelined"("playerId");

-- CreateIndex
CREATE INDEX "PlayerStatistic_playerId_idx" ON "PlayerStatistic"("playerId");

-- CreateIndex
CREATE INDEX "PlayerStatistic_teamId_idx" ON "PlayerStatistic"("teamId");

-- CreateIndex
CREATE INDEX "PlayerStatistic_leagueId_idx" ON "PlayerStatistic"("leagueId");

-- CreateIndex
CREATE INDEX "PlayerStatistic_season_idx" ON "PlayerStatistic"("season");

-- CreateIndex
CREATE INDEX "PlayerTeam_playerId_idx" ON "PlayerTeam"("playerId");

-- CreateIndex
CREATE INDEX "PlayerTeam_teamId_idx" ON "PlayerTeam"("teamId");

-- CreateIndex
CREATE INDEX "PlayerTeam_season_idx" ON "PlayerTeam"("season");

-- CreateIndex
CREATE INDEX "PlayerTransfer_playerId_idx" ON "PlayerTransfer"("playerId");

-- CreateIndex
CREATE INDEX "PlayerTransfer_fromTeamId_idx" ON "PlayerTransfer"("fromTeamId");

-- CreateIndex
CREATE INDEX "PlayerTransfer_toTeamId_idx" ON "PlayerTransfer"("toTeamId");

-- CreateIndex
CREATE INDEX "Season_year_idx" ON "Season"("year");

-- CreateIndex
CREATE INDEX "Standings_leagueId_idx" ON "Standings"("leagueId");

-- CreateIndex
CREATE INDEX "Standings_seasonId_idx" ON "Standings"("seasonId");

-- CreateIndex
CREATE INDEX "Standings_teamId_idx" ON "Standings"("teamId");

-- CreateIndex
CREATE INDEX "Team_name_idx" ON "Team"("name");

-- CreateIndex
CREATE INDEX "Team_countryId_idx" ON "Team"("countryId");

-- CreateIndex
CREATE INDEX "Venue_name_idx" ON "Venue"("name");

-- CreateIndex
CREATE INDEX "Venue_city_idx" ON "Venue"("city");

-- CreateIndex
CREATE INDEX "fixture_events_fixtureId_idx" ON "fixture_events"("fixtureId");

-- CreateIndex
CREATE INDEX "fixture_events_leagueId_idx" ON "fixture_events"("leagueId");

-- CreateIndex
CREATE INDEX "fixture_events_seasonId_idx" ON "fixture_events"("seasonId");

-- CreateIndex
CREATE INDEX "fixture_events_teamId_idx" ON "fixture_events"("teamId");

-- CreateIndex
CREATE INDEX "fixture_events_playerId_idx" ON "fixture_events"("playerId");

-- CreateIndex
CREATE INDEX "fixture_events_assistId_idx" ON "fixture_events"("assistId");
