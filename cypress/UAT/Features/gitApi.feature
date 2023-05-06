Feature:  Api Testing for GitHub As a Project

    Scenario: Create a repository for the authenticated user
        Given Make a post request with the resource '/user/repos'
        When Print the response in console
        Then Store Necessary data in the variable
        And The response status code should be '201'
        Then Check Wether the RepoName is stored in variable 'Api-Testing-Repo'

    Scenario: Update a Repository
        Given Make a patch request with resource '/repos/Amitaryan9906/Api-Testing-Repo'
        When Print the response in console
        Then Store Necessary data in the variable
        And The response status code should be '200'
        Then Check the Updated RepoName 'Updated-Repo-Testing'

    Scenario: Get a Repository
    Given Make a GET request with resource '/repos/Amitaryan9906/'
    When Print the response in console
    And The response status code should be '200'

    Scenario: Create file contents
        Given Make a PUT request with the resource '/repos/Amitaryan9906/Updated-Repo-Testing/contents/readme.md'
        Then Print the response in console
        Then Store Necessary data in the variable
        Then The response status code should be '201'
        And Check Wether the sha value is stored in variable

    # Scenario: Crete a Fork
    #     Given Make a post request with the resource '/repos/'
    #     When Print the fork repo in console
    #     Then Store Necessary data in the variable
    #     And The response status code should be '202'
    
    Scenario: Delete a repository
        Given Make a Delete request with the resource '/repos/Amitaryan9906/Updated-Repo-Testing'
        Then The Delete response status code should be '204'